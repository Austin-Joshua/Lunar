package models

import (
	"time"
)

type User struct {
	ID            string    `json:"id" firestore:"-"`
	Name          string    `json:"name" firestore:"name"`
	Email         string    `json:"email" firestore:"email"`
	Password      string    `json:"-" firestore:"password"`
	Role          string    `json:"role" firestore:"role"`
	OAuthProvider *string   `json:"oauth_provider,omitempty" firestore:"oauth_provider,omitempty"`
	OAuthID       *string   `json:"oauth_id,omitempty" firestore:"oauth_id,omitempty"`
	ProfileImage  *string   `json:"profile_image,omitempty" firestore:"profile_image,omitempty"`
	CreatedAt     time.Time `json:"created_at" firestore:"created_at"`
	UpdatedAt     time.Time `json:"updated_at" firestore:"updated_at"`
}

type UserResponse struct {
	ID            string  `json:"id"`
	Name          string  `json:"name"`
	Email         string  `json:"email"`
	Role          string  `json:"role"`
	OAuthProvider *string `json:"oauth_provider,omitempty"`
	ProfileImage  *string `json:"profile_image,omitempty"`
	CreatedAt     string  `json:"createdAt"`
}

func (u *User) ToResponse() *UserResponse {
	return &UserResponse{
		ID:            u.ID,
		Name:          u.Name,
		Email:         u.Email,
		Role:          u.Role,
		OAuthProvider: u.OAuthProvider,
		ProfileImage:  u.ProfileImage,
		CreatedAt:     u.CreatedAt.Format(time.RFC3339),
	}
}
