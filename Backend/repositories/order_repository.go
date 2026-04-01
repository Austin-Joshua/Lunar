package repositories

import (
	"context"
	"fmt"
	"time"

	"lunar-backend/config"
	"lunar-backend/models"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type OrderRepository struct{}

func NewOrderRepository() *OrderRepository {
	return &OrderRepository{}
}

func (r *OrderRepository) GetAll() ([]*models.Order, error) {
	ctx := context.Background()
	iter := config.FirestoreClient.Collection("orders").OrderBy("created_at", firestore.Desc).Documents(ctx)
	defer iter.Stop()

	var orders []*models.Order
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var order models.Order
		if err := doc.DataTo(&order); err != nil {
			return nil, err
		}
		order.ID = doc.Ref.ID
		order.Total = order.TotalPrice
		orders = append(orders, &order)
	}

	return orders, nil
}

func (r *OrderRepository) GetByID(id string) (*models.Order, error) {
	ctx := context.Background()
	doc, err := config.FirestoreClient.Collection("orders").Doc(id).Get(ctx)
	if err != nil {
		return nil, err
	}

	var order models.Order
	if err := doc.DataTo(&order); err != nil {
		return nil, err
	}
	order.ID = doc.Ref.ID
	order.Total = order.TotalPrice

	return &order, nil
}

func (r *OrderRepository) GetByUserID(userID string) ([]*models.Order, error) {
	ctx := context.Background()
	iter := config.FirestoreClient.Collection("orders").
		Where("user_id", "==", userID).
		OrderBy("created_at", firestore.Desc).
		Documents(ctx)
	defer iter.Stop()

	var orders []*models.Order
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var order models.Order
		if err := doc.DataTo(&order); err != nil {
			return nil, err
		}
		order.ID = doc.Ref.ID
		order.Total = order.TotalPrice
		orders = append(orders, &order)
	}

	return orders, nil
}

func (r *OrderRepository) Create(userID string, items []models.OrderItem, totalPrice float64, userName, userEmail string) (*models.Order, error) {
	ctx := context.Background()
	
	order := models.Order{
		UserID:     userID,
		UserName:   &userName,
		UserEmail:  &userEmail,
		TotalPrice: totalPrice,
		Status:     "pending",
		Items:      items,
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
	}

	batch := config.FirestoreClient.Batch()
	orderRef := config.FirestoreClient.Collection("orders").NewDoc()
	batch.Set(orderRef, order)

	// Here we could add stock updates to the batch if needed
	// e.g. for _, item := range items {
	//    prodRef := config.FirestoreClient.Collection("products").Doc(item.ProductID)
	//    batch.Update(prodRef, []firestore.Update{{Path: "stock", Value: firestore.Increment(-item.Quantity)}})
	// }

	_, err := batch.Commit(ctx)
	if err != nil {
		return nil, err
	}
	order.ID = orderRef.ID

	return &order, nil
}

func (r *OrderRepository) UpdateStatus(id string, status string) (*models.Order, error) {
	validStatuses := map[string]bool{"pending": true, "shipped": true, "delivered": true, "cancelled": true, "processing": true}
	if !validStatuses[status] {
		return nil, &InvalidStatusError{Status: status}
	}

	ctx := context.Background()
	_, err := config.FirestoreClient.Collection("orders").Doc(id).Update(ctx, []firestore.Update{
		{Path: "status", Value: status},
		{Path: "updated_at", Value: time.Now()},
	})
	if err != nil {
		return nil, err
	}

	return r.GetByID(id)
}

type InvalidStatusError struct {
	Status string
}

func (e *InvalidStatusError) Error() string {
	return fmt.Sprintf("Invalid status: %s", e.Status)
}
