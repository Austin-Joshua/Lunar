package services

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"errors"
	"os"
	"strings"
	"time"

	"lunar-backend/config"
	"lunar-backend/models"
	"lunar-backend/repositories"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	userRepo  *repositories.UserRepository
	tokenRepo *repositories.TokenRepository
}

func NewAuthService() *AuthService {
	return &AuthService{
		userRepo:  repositories.NewUserRepository(),
		tokenRepo: repositories.NewTokenRepository(),
	}
}

type RegisterInput struct {
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

type LoginInput struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type GoogleLoginInput struct {
	IDToken string `json:"idToken" binding:"required"`
}

type TokenResponse struct {
	AccessToken  string               `json:"accessToken"`
	RefreshToken string               `json:"refreshToken"`
	ExpiresIn    string               `json:"expiresIn"`
	User         *models.UserResponse `json:"user"`
}

func (s *AuthService) Register(input RegisterInput) (*TokenResponse, error) {
	email := strings.ToLower(strings.TrimSpace(input.Email))
	existingUser, err := s.userRepo.FindByEmail(email)
	if err != nil {
		return nil, err
	}
	if existingUser != nil {
		return nil, errors.New("this email is already registered")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	user, err := s.userRepo.Create(input.Name, email, string(hashedPassword))
	if err != nil {
		return nil, err
	}

	return s.generateTokens(user)
}

func (s *AuthService) Login(input LoginInput) (*TokenResponse, error) {
	user, err := s.userRepo.FindByEmail(strings.ToLower(strings.TrimSpace(input.Email)))
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("invalid email or password")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		return nil, errors.New("invalid email or password")
	}

	return s.generateTokens(user)
}

func (s *AuthService) LoginWithGoogle(ctx context.Context, idToken string) (*TokenResponse, error) {
	if config.AuthClient == nil {
		return nil, errors.New("firebase auth is not configured")
	}

	token, err := config.AuthClient.VerifyIDToken(ctx, idToken)
	if err != nil {
		return nil, errors.New("invalid or expired Google sign-in")
	}

	emailRaw, _ := token.Claims["email"].(string)
	email := strings.ToLower(strings.TrimSpace(emailRaw))
	if email == "" {
		return nil, errors.New("Google account has no email")
	}

	name, _ := token.Claims["name"].(string)
	name = strings.TrimSpace(name)
	if name == "" {
		if at := strings.Index(email, "@"); at > 0 {
			name = email[:at]
		} else {
			name = "User"
		}
	}

	var profileImage *string
	if pic, ok := token.Claims["picture"].(string); ok && strings.TrimSpace(pic) != "" {
		pic = strings.TrimSpace(pic)
		profileImage = &pic
	}

	user, err := s.userRepo.FindByEmail(email)
	if err != nil {
		return nil, err
	}
	if user != nil {
		if err := s.userRepo.UpdateOAuthData(user.ID, "google", token.UID, profileImage); err != nil {
			return nil, err
		}
		updated, err := s.userRepo.FindByID(user.ID)
		if err != nil {
			return nil, err
		}
		return s.generateTokens(updated)
	}

	randomBytes := make([]byte, 32)
	if _, err := rand.Read(randomBytes); err != nil {
		return nil, err
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(hex.EncodeToString(randomBytes)), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	newUser, err := s.userRepo.CreateOAuth(name, email, string(hashedPassword), "google", token.UID, profileImage)
	if err != nil {
		return nil, err
	}

	return s.generateTokens(newUser)
}

func (s *AuthService) RefreshToken(refreshToken string) (string, error) {
	tokenData, err := s.tokenRepo.Verify(refreshToken)
	if err != nil {
		return "", err
	}
	if tokenData == nil {
		return "", errors.New("invalid or expired refresh token")
	}

	return s.generateAccessToken(tokenData.UserID, "", "")
}

func (s *AuthService) Logout(refreshToken string) error {
	if refreshToken == "" {
		return nil
	}
	return s.tokenRepo.Revoke(refreshToken)
}

func (s *AuthService) LogoutAll(userID string) error {
	return s.tokenRepo.RevokeAllForUser(userID)
}

func (s *AuthService) GetProfile(userID string) (*models.UserResponse, error) {
	user, err := s.userRepo.FindByID(userID)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("user not found")
	}
	return user.ToResponse(), nil
}

func (s *AuthService) generateTokens(user *models.User) (*TokenResponse, error) {
	accessToken, err := s.generateAccessToken(user.ID, user.Email, user.Role)
	if err != nil {
		return nil, err
	}

	refreshToken, err := s.generateRefreshToken(user.ID, user.Email)
	if err != nil {
		return nil, err
	}

	if err := s.tokenRepo.Create(user.ID, refreshToken, 7*24*60*60); err != nil {
		return nil, err
	}

	return &TokenResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		ExpiresIn:    "15m",
		User:         user.ToResponse(),
	}, nil
}

func (s *AuthService) generateAccessToken(userID string, email, role string) (string, error) {
	claims := jwt.MapClaims{
		"id":    userID,
		"email": email,
		"role":  role,
		"exp":   time.Now().Add(15 * time.Minute).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	secret := os.Getenv("JWT_SECRET")
	return token.SignedString([]byte(secret))
}

func (s *AuthService) generateRefreshToken(userID string, email string) (string, error) {
	claims := jwt.MapClaims{
		"id":    userID,
		"email": email,
		"exp":   time.Now().Add(7 * 24 * time.Hour).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	secret := os.Getenv("JWT_SECRET")
	return token.SignedString([]byte(secret))
}
