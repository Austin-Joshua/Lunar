package controllers

import (
	"net/http"
	"time"

	"lunar-backend/services"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	authService *services.AuthService
}

func NewAuthHandler() *AuthHandler {
	return &AuthHandler{
		authService: services.NewAuthService(),
	}
}

func (h *AuthHandler) Register(c *gin.Context) {
	var input services.RegisterInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Name, email, and password are required.",
		})
		return
	}

	result, err := h.authService.Register(input)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success":   true,
		"message":   "User registered successfully.",
		"data":      result,
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (h *AuthHandler) Login(c *gin.Context) {
	var input services.LoginInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Email and password are required.",
		})
		return
	}

	result, err := h.authService.Login(input)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":   true,
		"message":   "Login successful.",
		"data":      result,
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (h *AuthHandler) GetProfile(c *gin.Context) {
	userID, _ := c.Get("user_id")
	id := userID.(string)

	profile, err := h.authService.GetProfile(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":   true,
		"message":   "Profile retrieved successfully.",
		"data":      profile,
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (h *AuthHandler) RefreshToken(c *gin.Context) {
	var body struct {
		RefreshToken string `json:"refreshToken" binding:"required"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Refresh token is required",
		})
		return
	}

	token, err := h.authService.RefreshToken(body.RefreshToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Token refreshed successfully",
		"data": gin.H{
			"accessToken": token,
			"expiresIn":   "15m",
		},
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (h *AuthHandler) Logout(c *gin.Context) {
	var body struct {
		RefreshToken string `json:"refreshToken"`
	}

	c.ShouldBindJSON(&body)

	if err := h.authService.Logout(body.RefreshToken); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to logout",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":   true,
		"message":   "Logged out successfully",
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (h *AuthHandler) LogoutAll(c *gin.Context) {
	userID, _ := c.Get("user_id")
	id := userID.(string)

	if err := h.authService.LogoutAll(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to logout from all devices",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":   true,
		"message":   "Logged out from all devices",
		"timestamp": time.Now().Format(time.RFC3339),
	})
}
