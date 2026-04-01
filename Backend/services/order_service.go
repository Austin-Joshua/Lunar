package services

import (
	"errors"

	"lunar-backend/models"
	"lunar-backend/repositories"
)

type OrderService struct {
	orderRepo   *repositories.OrderRepository
	productRepo *repositories.ProductRepository
}

func NewOrderService() *OrderService {
	return &OrderService{
		orderRepo:   repositories.NewOrderRepository(),
		productRepo: repositories.NewProductRepository(),
	}
}

type CreateOrderInput struct {
	Items []OrderItemInput `json:"items" binding:"required,min=1"`
}

type OrderItemInput struct {
	ProductID string  `json:"productId" binding:"required"`
	Quantity  int     `json:"quantity" binding:"required,gt=0"`
	Price     float64 `json:"price" binding:"required,gt=0"`
}

func (s *OrderService) GetAll() ([]*models.Order, error) {
	return s.orderRepo.GetAll()
}

func (s *OrderService) GetByID(id string) (*models.Order, error) {
	order, err := s.orderRepo.GetByID(id)
	if err != nil {
		return nil, err
	}
	if order == nil {
		return nil, errors.New("order not found")
	}
	return order, nil
}

func (s *OrderService) GetByUserID(userID string) ([]*models.Order, error) {
	return s.orderRepo.GetByUserID(userID)
}

func (s *OrderService) Create(userID string, userName, userEmail string, input CreateOrderInput) (*models.Order, error) {
	if len(input.Items) == 0 {
		return nil, errors.New("order items are required")
	}

	var totalPrice float64
	orderItems := make([]models.OrderItem, len(input.Items))

	for i, item := range input.Items {
		if item.ProductID == "" || item.Quantity <= 0 || item.Price <= 0 {
			return nil, errors.New("each item must have productId, quantity, and price")
		}

		product, err := s.productRepo.GetByID(item.ProductID)
		if err != nil {
			return nil, err
		}
		if product == nil {
			return nil, errors.New("product not found: " + item.ProductID)
		}

		if product.Stock < item.Quantity {
			return nil, errors.New("insufficient stock for product: " + product.Name)
		}

		orderItems[i] = models.OrderItem{
			ProductID: item.ProductID,
			Quantity:  item.Quantity,
			Price:     item.Price,
			Name:      &product.Name,
			Brand:     &product.Brand,
			Image:     &product.ImageURL,
		}

		totalPrice += float64(item.Quantity) * item.Price
	}

	return s.orderRepo.Create(userID, orderItems, totalPrice, userName, userEmail)
}

func (s *OrderService) UpdateStatus(id string, status string) (*models.Order, error) {
	order, err := s.orderRepo.GetByID(id)
	if err != nil {
		return nil, err
	}
	if order == nil {
		return nil, errors.New("order not found")
	}

	return s.orderRepo.UpdateStatus(id, status)
}
