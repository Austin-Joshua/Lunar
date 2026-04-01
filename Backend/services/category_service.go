package services

import (
	"errors"

	"lunar-backend/models"
	"lunar-backend/repositories"
)

type CategoryService struct {
	categoryRepo *repositories.CategoryRepository
}

func NewCategoryService() *CategoryService {
	return &CategoryService{
		categoryRepo: repositories.NewCategoryRepository(),
	}
}

func (s *CategoryService) GetAll() ([]*models.Category, error) {
	return s.categoryRepo.GetAll()
}

func (s *CategoryService) GetByGender(gender string) ([]*models.Category, error) {
	validGenders := map[string]bool{"men": true, "women": true, "kids": true}
	if !validGenders[gender] {
		return nil, errors.New("invalid gender")
	}
	return s.categoryRepo.GetByGender(gender)
}

type CreateCategoryInput struct {
	Name   string `json:"name" binding:"required"`
	Gender string `json:"gender" binding:"required"`
}

func (s *CategoryService) Create(input CreateCategoryInput) (*models.Category, error) {
	validGenders := map[string]bool{"men": true, "women": true, "kids": true}
	if !validGenders[input.Gender] {
		return nil, errors.New("invalid gender")
	}

	existing, err := s.categoryRepo.FindByNameAndGender(input.Name, input.Gender)
	if err != nil {
		return nil, err
	}
	if existing != nil {
		return nil, errors.New("category already exists")
	}

	return s.categoryRepo.Create(input.Name, input.Gender)
}
