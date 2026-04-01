package repositories

import (
	"context"
	"time"

	"lunar-backend/config"
	"lunar-backend/models"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type CategoryRepository struct{}

func NewCategoryRepository() *CategoryRepository {
	return &CategoryRepository{}
}

func (r *CategoryRepository) GetAll() ([]*models.Category, error) {
	ctx := context.Background()
	iter := config.FirestoreClient.Collection("categories").OrderBy("gender", firestore.Asc).OrderBy("name", firestore.Asc).Documents(ctx)
	defer iter.Stop()

	var categories []*models.Category
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var category models.Category
		if err := doc.DataTo(&category); err != nil {
			return nil, err
		}
		category.ID = doc.Ref.ID
		categories = append(categories, &category)
	}

	return categories, nil
}

func (r *CategoryRepository) GetByGender(gender string) ([]*models.Category, error) {
	ctx := context.Background()
	iter := config.FirestoreClient.Collection("categories").Where("gender", "==", gender).OrderBy("name", firestore.Asc).Documents(ctx)
	defer iter.Stop()

	var categories []*models.Category
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var category models.Category
		if err := doc.DataTo(&category); err != nil {
			return nil, err
		}
		category.ID = doc.Ref.ID
		categories = append(categories, &category)
	}

	return categories, nil
}

func (r *CategoryRepository) Create(name, gender string) (*models.Category, error) {
	ctx := context.Background()
	category := models.Category{
		Name:      name,
		Gender:    gender,
		CreatedAt: time.Now(),
	}

	docRef, _, err := config.FirestoreClient.Collection("categories").Add(ctx, category)
	if err != nil {
		return nil, err
	}
	category.ID = docRef.ID

	return &category, nil
}

func (r *CategoryRepository) FindByNameAndGender(name, gender string) (*models.Category, error) {
	ctx := context.Background()
	iter := config.FirestoreClient.Collection("categories").
		Where("name", "==", name).
		Where("gender", "==", gender).
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

	var category models.Category
	if err := doc.DataTo(&category); err != nil {
		return nil, err
	}
	category.ID = doc.Ref.ID

	return &category, nil
}
