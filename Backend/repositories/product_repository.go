package repositories

import (
	"context"
	"strings"
	"time"

	"lunar-backend/config"
	"lunar-backend/models"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type ProductRepository struct{}

func NewProductRepository() *ProductRepository {
	return &ProductRepository{}
}

func (r *ProductRepository) GetAll(limit int, offset int) ([]*models.Product, error) {
	ctx := context.Background()
	query := config.FirestoreClient.Collection("products").OrderBy("created_at", firestore.Desc)
	
	if limit > 0 {
		query = query.Limit(limit)
	}
	if offset > 0 {
		query = query.Offset(offset)
	}

	iter := query.Documents(ctx)
	return r.scanProducts(iter)
}

func (r *ProductRepository) GetByID(id string) (*models.Product, error) {
	ctx := context.Background()
	doc, err := config.FirestoreClient.Collection("products").Doc(id).Get(ctx)
	if err != nil {
		return nil, err
	}

	var product models.Product
	if err := doc.DataTo(&product); err != nil {
		return nil, err
	}
	product.ID = doc.Ref.ID
	product.Image = product.ImageURL

	return &product, nil
}

func (r *ProductRepository) GetByGender(gender string) ([]*models.Product, error) {
	ctx := context.Background()
	iter := config.FirestoreClient.Collection("products").
		Where("gender", "==", gender).
		OrderBy("created_at", firestore.Desc).
		Documents(ctx)
	return r.scanProducts(iter)
}

func (r *ProductRepository) GetByGenderAndCategory(gender, categoryName string) ([]*models.Product, error) {
	ctx := context.Background()
	iter := config.FirestoreClient.Collection("products").
		Where("gender", "==", gender).
		Where("category", "==", categoryName).
		OrderBy("created_at", firestore.Desc).
		Documents(ctx)
	return r.scanProducts(iter)
}

func (r *ProductRepository) Search(searchQuery string) ([]*models.Product, error) {
	ctx := context.Background()
	// Firestore doesn't support native full-text search with LIKE.
	// For simple parity, we'll fetch all and filter in memory if the dataset is small,
	// or just search for exact prefix if possible.
	// But to stay functionally identical for a migration, we'll fetch all and filter in-memory.
	iter := config.FirestoreClient.Collection("products").Documents(ctx)
	defer iter.Stop()

	var products []*models.Product
	searchLower := strings.ToLower(searchQuery)

	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var product models.Product
		if err := doc.DataTo(&product); err != nil {
			return nil, err
		}
		product.ID = doc.Ref.ID

		if strings.Contains(strings.ToLower(product.Name), searchLower) ||
			strings.Contains(strings.ToLower(product.Brand), searchLower) ||
			strings.Contains(strings.ToLower(product.Description), searchLower) {
			product.Image = product.ImageURL
			products = append(products, &product)
		}
	}

	return products, nil
}

func (r *ProductRepository) Create(product *models.Product) (*models.Product, error) {
	ctx := context.Background()
	product.CreatedAt = time.Now()
	product.UpdatedAt = time.Now()

	docRef, _, err := config.FirestoreClient.Collection("products").Add(ctx, product)
	if err != nil {
		return nil, err
	}

	product.ID = docRef.ID
	product.Image = product.ImageURL

	return product, nil
}

func (r *ProductRepository) Update(id string, updates map[string]interface{}) (*models.Product, error) {
	ctx := context.Background()
	
	var fsUpdates []firestore.Update
	for k, v := range updates {
		// Map SQL columns to Firestore fields if they differ
		fsUpdates = append(fsUpdates, firestore.Update{Path: k, Value: v})
	}
	fsUpdates = append(fsUpdates, firestore.Update{Path: "updated_at", Value: time.Now()})

	_, err := config.FirestoreClient.Collection("products").Doc(id).Update(ctx, fsUpdates)
	if err != nil {
		return nil, err
	}

	return r.GetByID(id)
}

func (r *ProductRepository) Delete(id string) (bool, error) {
	ctx := context.Background()
	_, err := config.FirestoreClient.Collection("products").Doc(id).Delete(ctx)
	if err != nil {
		return false, err
	}
	return true, nil
}

func (r *ProductRepository) scanProducts(iter *firestore.DocumentIterator) ([]*models.Product, error) {
	defer iter.Stop()
	var products []*models.Product

	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var product models.Product
		if err := doc.DataTo(&product); err != nil {
			return nil, err
		}
		product.ID = doc.Ref.ID
		product.Image = product.ImageURL

		products = append(products, &product)
	}

	return products, nil
}
