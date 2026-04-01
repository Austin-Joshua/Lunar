package repositories

import (
	"context"
	"time"

	"lunar-backend/config"
	"lunar-backend/models"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type TokenRepository struct{}

func NewTokenRepository() *TokenRepository {
	return &TokenRepository{}
}

func (r *TokenRepository) Create(userID string, token string, expiresIn int) error {
	ctx := context.Background()
	expiresAt := time.Now().Add(time.Duration(expiresIn) * time.Second)
	
	rt := models.RefreshToken{
		UserID:    userID,
		Token:     token,
		ExpiresAt: expiresAt,
		IsRevoked: false,
		CreatedAt: time.Now(),
	}

	_, _, err := config.FirestoreClient.Collection("refresh_tokens").Add(ctx, rt)
	return err
}

func (r *TokenRepository) Verify(token string) (*models.RefreshToken, error) {
	ctx := context.Background()
	iter := config.FirestoreClient.Collection("refresh_tokens").
		Where("token", "==", token).
		Where("is_revoked", "==", false).
		Where("expires_at", ">", time.Now()).
		Limit(1).
		Documents(ctx)
	defer iter.Stop()

	doc, err := iter.Next()
	if err == iterator.Done {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	var rt models.RefreshToken
	if err := doc.DataTo(&rt); err != nil {
		return nil, err
	}
	rt.ID = doc.Ref.ID

	return &rt, nil
}

func (r *TokenRepository) Revoke(token string) error {
	ctx := context.Background()
	iter := config.FirestoreClient.Collection("refresh_tokens").Where("token", "==", token).Documents(ctx)
	defer iter.Stop()

	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return err
		}
		_, err = doc.Ref.Update(ctx, []firestore.Update{
			{Path: "is_revoked", Value: true},
			{Path: "revoked_at", Value: time.Now()},
		})
		if err != nil {
			return err
		}
	}
	return nil
}

func (r *TokenRepository) RevokeAllForUser(userID string) error {
	ctx := context.Background()
	iter := config.FirestoreClient.Collection("refresh_tokens").Where("user_id", "==", userID).Where("is_revoked", "==", false).Documents(ctx)
	defer iter.Stop()

	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return err
		}
		_, err = doc.Ref.Update(ctx, []firestore.Update{
			{Path: "is_revoked", Value: true},
			{Path: "revoked_at", Value: time.Now()},
		})
		if err != nil {
			return err
		}
	}
	return nil
}
