package models

import (
	"time"
)

type Order struct {
	ID         string      `json:"id" firestore:"-"`
	UserID     string      `json:"user_id" firestore:"user_id"`
	UserIDStr  string      `json:"userId,omitempty" firestore:"-"`
	UserName   *string     `json:"userName,omitempty" firestore:"user_name,omitempty"`
	UserEmail  *string     `json:"userEmail,omitempty" firestore:"user_email,omitempty"`
	TotalPrice float64     `json:"total_price" firestore:"total_price"`
	Total      float64     `json:"total,omitempty" firestore:"-"`
	Status     string      `json:"status" firestore:"status"`
	Items      []OrderItem `json:"items" firestore:"items"`
	CreatedAt  time.Time   `json:"created_at" firestore:"created_at"`
	UpdatedAt  time.Time   `json:"updated_at" firestore:"updated_at"`
}

type OrderItem struct {
	ID           string  `json:"id" firestore:"-"`
	OrderID      string  `json:"order_id" firestore:"-"`
	ProductID    string  `json:"product_id" firestore:"product_id"`
	ProductIDStr string  `json:"productId,omitempty" firestore:"-"`
	Name         *string `json:"name,omitempty" firestore:"name,omitempty"`
	Brand        *string `json:"brand,omitempty" firestore:"brand,omitempty"`
	Image        *string `json:"image,omitempty" firestore:"image,omitempty"`
	Quantity     int     `json:"quantity" firestore:"quantity"`
	Price        float64 `json:"price" firestore:"price"`
}

type RefreshToken struct {
	ID        string     `json:"id" firestore:"-"`
	UserID    string     `json:"user_id" firestore:"user_id"`
	Token     string     `json:"token" firestore:"token"`
	ExpiresAt time.Time  `json:"expires_at" firestore:"expires_at"`
	IsRevoked bool       `json:"is_revoked" firestore:"is_revoked"`
	RevokedAt *time.Time `json:"revoked_at,omitempty" firestore:"revoked_at,omitempty"`
	CreatedAt time.Time  `json:"created_at" firestore:"created_at"`
}
