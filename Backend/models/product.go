package models

import (
	"time"
)

type Product struct {
	ID          string    `json:"id" firestore:"-"`
	Name        string    `json:"name" firestore:"name"`
	Brand       string    `json:"brand" firestore:"brand"`
	Description string    `json:"description" firestore:"description"`
	Gender      string    `json:"gender" firestore:"gender"`
	CategoryID  *string   `json:"category_id,omitempty" firestore:"category_id,omitempty"`
	Category    *string   `json:"category,omitempty" firestore:"category,omitempty"`
	Price       float64   `json:"price" firestore:"price"`
	Stock       int       `json:"stock" firestore:"stock"`
	ImageURL    string    `json:"image_url" firestore:"image_url"`
	Image       string    `json:"image,omitempty" firestore:"image,omitempty"`
	InStock     bool      `json:"inStock" firestore:"-"`
	CreatedAt   time.Time `json:"created_at" firestore:"created_at"`
	UpdatedAt   time.Time `json:"updated_at" firestore:"updated_at"`
}

type ProductResponse struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Brand       string  `json:"brand"`
	Price       float64 `json:"price"`
	Description string  `json:"description"`
	Gender      string  `json:"gender"`
	Category    *string `json:"category,omitempty"`
	Stock       int     `json:"stock"`
	Image       string  `json:"image"`
	InStock     bool    `json:"inStock"`
}

func (p *Product) ToResponse() *ProductResponse {
	return &ProductResponse{
		ID:          p.ID,
		Name:        p.Name,
		Brand:       p.Brand,
		Price:       p.Price,
		Description: p.Description,
		Gender:      p.Gender,
		Category:    p.Category,
		Stock:       p.Stock,
		Image:       p.Image,
		InStock:     p.Stock > 0,
	}
}
