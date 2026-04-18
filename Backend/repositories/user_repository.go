package repositories

import (
	"context"
	"time"

	"lunar-backend/config"
	"lunar-backend/models"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type UserRepository struct{}

func NewUserRepository() *UserRepository {
	return &UserRepository{}
}

func (r *UserRepository) CreateOAuth(name, email, hashedPassword, provider, oauthID string, profileImage *string) (*models.User, error) {
	ctx := context.Background()
	user := models.User{
		Name:          name,
		Email:         email,
		Password:      hashedPassword,
		Role:          "user",
		OAuthProvider: strPtr(provider),
		OAuthID:       strPtr(oauthID),
		ProfileImage:  profileImage,
		CreatedAt:     time.Now(),
		UpdatedAt:     time.Now(),
	}

	docRef, _, err := config.FirestoreClient.Collection("users").Add(ctx, user)
	if err != nil {
		return nil, err
	}
	user.ID = docRef.ID

	return &user, nil
}

func strPtr(s string) *string {
	return &s
}

func (r *UserRepository) Create(name, email, password string) (*models.User, error) {
	ctx := context.Background()
	user := models.User{
		Name:      name,
		Email:     email,
		Password:  password,
		Role:      "user",
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	docRef, _, err := config.FirestoreClient.Collection("users").Add(ctx, user)
	if err != nil {
		return nil, err
	}
	user.ID = docRef.ID

	return &user, nil
}

func (r *UserRepository) FindByEmail(email string) (*models.User, error) {
	ctx := context.Background()
	// Note: Firestore is case-sensitive by default.
	// For strict parity with LOWER(email), we'd need to store a lowercased email field.
	// Assuming best practice of storing lowercased emails.
	iter := config.FirestoreClient.Collection("users").Where("email", "==", email).Limit(1).Documents(ctx)
	defer iter.Stop()

	doc, err := iter.Next()
	if err == iterator.Done {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	var user models.User
	if err := doc.DataTo(&user); err != nil {
		return nil, err
	}
	user.ID = doc.Ref.ID

	return &user, nil
}

func (r *UserRepository) FindByID(id string) (*models.User, error) {
	ctx := context.Background()
	doc, err := config.FirestoreClient.Collection("users").Doc(id).Get(ctx)
	if err != nil {
		return nil, err
	}

	var user models.User
	if err := doc.DataTo(&user); err != nil {
		return nil, err
	}
	user.ID = doc.Ref.ID

	return &user, nil
}

func (r *UserRepository) GetAll() ([]*models.User, error) {
	ctx := context.Background()
	iter := config.FirestoreClient.Collection("users").OrderBy("created_at", firestore.Desc).Documents(ctx)
	defer iter.Stop()

	var users []*models.User
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var user models.User
		if err := doc.DataTo(&user); err != nil {
			return nil, err
		}
		user.ID = doc.Ref.ID
		users = append(users, &user)
	}

	return users, nil
}

func (r *UserRepository) UpdateOAuthData(userID string, provider, oauthID string, profileImage *string) error {
	ctx := context.Background()
	updates := []firestore.Update{
		{Path: "oauth_provider", Value: provider},
		{Path: "oauth_id", Value: oauthID},
		{Path: "profile_image", Value: profileImage},
		{Path: "updated_at", Value: time.Now()},
	}
	_, err := config.FirestoreClient.Collection("users").Doc(userID).Update(ctx, updates)
	return err
}
