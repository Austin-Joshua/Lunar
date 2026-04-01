package services

import (
	"errors"

	"lunar-backend/models"
	"lunar-backend/repositories"
)

type ProductService struct {
	productRepo  *repositories.ProductRepository
	categoryRepo *repositories.CategoryRepository
}

func NewProductService() *ProductService {
	return &ProductService{
		productRepo:  repositories.NewProductRepository(),
		categoryRepo: repositories.NewCategoryRepository(),
	}
}

func (s *ProductService) GetAll(limit int, offset int) ([]*models.ProductResponse, error) {
	products, err := s.productRepo.GetAll(limit, offset)
	if err != nil {
		return nil, err
	}
	return s.toProductResponses(products), nil
}

func (s *ProductService) GetByID(id string) (*models.ProductResponse, error) {
	product, err := s.productRepo.GetByID(id)
	if err != nil {
		return nil, err
	}
	if product == nil {
		return nil, errors.New("product not found")
	}
	return product.ToResponse(), nil
}

func (s *ProductService) GetByGender(gender string) ([]*models.ProductResponse, error) {
	validGenders := map[string]bool{"men": true, "women": true, "kids": true}
	if !validGenders[gender] {
		return nil, errors.New("invalid gender")
	}

	products, err := s.productRepo.GetByGender(gender)
	if err != nil {
		return nil, err
	}
	return s.toProductResponses(products), nil
}

func (s *ProductService) GetByGenderAndCategory(gender, category string) ([]*models.ProductResponse, error) {
	validGenders := map[string]bool{"men": true, "women": true, "kids": true}
	if !validGenders[gender] {
		return nil, errors.New("invalid gender")
	}

	products, err := s.productRepo.GetByGenderAndCategory(gender, category)
	if err != nil {
		return nil, err
	}
	return s.toProductResponses(products), nil
}

func (s *ProductService) Search(query string) ([]*models.ProductResponse, error) {
	if query == "" {
		return nil, errors.New("search query is required")
	}

	products, err := s.productRepo.Search(query)
	if err != nil {
		return nil, err
	}
	return s.toProductResponses(products), nil
}

type CreateProductInput struct {
	Name        string  `json:"name" binding:"required"`
	Brand       string  `json:"brand" binding:"required"`
	Description string  `json:"description" binding:"required"`
	Gender      string  `json:"gender" binding:"required"`
	Category    string  `json:"category" binding:"required"`
	Price       float64 `json:"price" binding:"required,gt=0"`
	Stock       int     `json:"stock" binding:"required,gte=0"`
	ImageURL    string  `json:"image_url" binding:"required"`
}

func (s *ProductService) Create(input CreateProductInput) (*models.ProductResponse, error) {
	validGenders := map[string]bool{"men": true, "women": true, "kids": true}
	if !validGenders[input.Gender] {
		return nil, errors.New("invalid gender")
	}

	var categoryID *string
	existingCategory, err := s.categoryRepo.FindByNameAndGender(input.Category, input.Gender)
	if err != nil {
		return nil, err
	}

	if existingCategory != nil {
		categoryID = &existingCategory.ID
	} else {
		newCategory, err := s.categoryRepo.Create(input.Category, input.Gender)
		if err != nil {
			return nil, err
		}
		categoryID = &newCategory.ID
	}

	product := &models.Product{
		Name:        input.Name,
		Brand:       input.Brand,
		Description: input.Description,
		Gender:      input.Gender,
		CategoryID:  categoryID,
		Category:    &input.Category,
		Price:       input.Price,
		Stock:       input.Stock,
		ImageURL:    input.ImageURL,
	}

	createdProduct, err := s.productRepo.Create(product)
	if err != nil {
		return nil, err
	}

	return createdProduct.ToResponse(), nil
}

type UpdateProductInput struct {
	Name        string  `json:"name,omitempty"`
	Brand       string  `json:"brand,omitempty"`
	Description string  `json:"description,omitempty"`
	Price       float64 `json:"price,omitempty"`
	Stock       int     `json:"stock,omitempty"`
	ImageURL    string  `json:"image_url,omitempty"`
	CategoryID  string  `json:"category_id,omitempty"`
}

func (s *ProductService) Update(id string, updates UpdateProductInput) (*models.ProductResponse, error) {
	product, err := s.productRepo.GetByID(id)
	if err != nil {
		return nil, err
	}
	if product == nil {
		return nil, errors.New("product not found")
	}

	updatesMap := make(map[string]interface{})
	if updates.Name != "" {
		updatesMap["name"] = updates.Name
	}
	if updates.Brand != "" {
		updatesMap["brand"] = updates.Brand
	}
	if updates.Description != "" {
		updatesMap["description"] = updates.Description
	}
	if updates.Price > 0 {
		updatesMap["price"] = updates.Price
	}
	if updates.Stock >= 0 {
		updatesMap["stock"] = updates.Stock
	}
	if updates.ImageURL != "" {
		updatesMap["image_url"] = updates.ImageURL
	}
	if updates.CategoryID != "" {
		updatesMap["category_id"] = updates.CategoryID
	}

	updatedProduct, err := s.productRepo.Update(id, updatesMap)
	if err != nil {
		return nil, err
	}

	return updatedProduct.ToResponse(), nil
}

func (s *ProductService) Delete(id string) error {
	product, err := s.productRepo.GetByID(id)
	if err != nil {
		return err
	}
	if product == nil {
		return errors.New("product not found")
	}

	_, err = s.productRepo.Delete(id)
	return err
}

func (s *ProductService) toProductResponses(products []*models.Product) []*models.ProductResponse {
	responses := make([]*models.ProductResponse, len(products))
	for i, p := range products {
		responses[i] = p.ToResponse()
	}
	return responses
}
