package models

import (
	"time"
)

type Category struct {
	ID        string    `json:"id" firestore:"-"`
	Name      string    `json:"name" firestore:"name"`
	Gender      string    `json:"gender" firestore:"gender"`
	CreatedAt time.Time `json:"created_at" firestore:"created_at"`
}
