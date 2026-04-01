package controllers

import (
	"net/http"
	"time"

	"lunar-backend/repositories"
	"lunar-backend/services"

	"context"
	"github.com/gin-gonic/gin"
)

type OrderHandler struct {
	orderService     *services.OrderService
	firebaseService *services.FirebaseService
}

func NewOrderHandler() *OrderHandler {
	fService, _ := services.NewFirebaseService()
	return &OrderHandler{
		orderService:    services.NewOrderService(),
		firebaseService: fService,
	}
}

func (h *OrderHandler) GetAll(c *gin.Context) {
	orders, err := h.orderService.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success":   false,
			"message":   "An error occurred while retrieving orders.",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":   true,
		"message":   "Orders retrieved successfully.",
		"data":      orders,
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (h *OrderHandler) GetMyOrders(c *gin.Context) {
	userID, _ := c.Get("user_id")
	id := userID.(string)

	orders, err := h.orderService.GetByUserID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success":   false,
			"message":   "An error occurred while retrieving orders.",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":   true,
		"message":   "Orders retrieved successfully.",
		"data":      orders,
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (h *OrderHandler) GetByID(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"success":   false,
			"message":   "Order ID is required",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	userID, _ := c.Get("user_id")
	userRole, _ := c.Get("user_role")

	order, err := h.orderService.GetByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success":   false,
			"message":   "Order not found.",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	if userRole != "admin" && order.UserID != userID.(string) {
		c.JSON(http.StatusForbidden, gin.H{
			"success":   false,
			"message":   "Forbidden. You do not have access to this order.",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":   true,
		"message":   "Order retrieved successfully.",
		"data":      order,
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (h *OrderHandler) Create(c *gin.Context) {
	userID, _ := c.Get("user_id")
	userName, _ := c.Get("user_name") // We might need to ensure these are set in middleware or fetch them
	userEmail, _ := c.Get("user_email")

	id := userID.(string)
	name := ""
	if userName != nil {
		name = userName.(string)
	}
	email := ""
	if userEmail != nil {
		email = userEmail.(string)
	}

	var input services.CreateOrderInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success":   false,
			"message":   "Order items are required.",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	order, err := h.orderService.Create(id, name, email, input)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success":   false,
			"message":   err.Error(),
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	// Part 4: Trigger real-time notification
	go func() {
		h.firebaseService.SendNotification(context.Background(), "USER_DEVICE_TOKEN", "Order Confirmed", "Your Lunar order has been placed successfully.")
	}()

	c.JSON(http.StatusCreated, gin.H{
		"success":   true,
		"message":   "Order created successfully.",
		"data":      order,
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (h *OrderHandler) UpdateStatus(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"success":   false,
			"message":   "Order ID is required",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	var body struct {
		Status string `json:"status" binding:"required"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success":   false,
			"message":   "Status is required.",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	order, err := h.orderService.UpdateStatus(id, body.Status)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success":   false,
			"message":   err.Error(),
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	// Part 4: Trigger real-time notification for status update
	go func() {
		h.firebaseService.SendNotification(context.Background(), "USER_DEVICE_TOKEN", "Order Update", "Your order status has been updated to: "+body.Status)
	}()

	c.JSON(http.StatusOK, gin.H{
		"success":   true,
		"message":   "Order status updated successfully.",
		"data":      order,
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

type CategoryHandler struct {
	categoryService *services.CategoryService
}

func NewCategoryHandler() *CategoryHandler {
	return &CategoryHandler{
		categoryService: services.NewCategoryService(),
	}
}

func (h *CategoryHandler) GetAll(c *gin.Context) {
	categories, err := h.categoryService.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success":   false,
			"message":   "An error occurred while retrieving categories.",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":   true,
		"message":   "Categories retrieved successfully.",
		"data":      categories,
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (h *CategoryHandler) GetByGender(c *gin.Context) {
	gender := c.Param("gender")

	categories, err := h.categoryService.GetByGender(gender)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success":   false,
			"message":   err.Error(),
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":   true,
		"message":   "Categories retrieved successfully.",
		"data":      categories,
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (h *CategoryHandler) Create(c *gin.Context) {
	var input services.CreateCategoryInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success":   false,
			"message":   "Name and gender are required.",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	category, err := h.categoryService.Create(input)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"success":   false,
			"message":   err.Error(),
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success":   true,
		"message":   "Category created successfully.",
		"data":      category,
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

type UserHandler struct {
	userRepo *repositories.UserRepository
}

func NewUserHandler() *UserHandler {
	return &UserHandler{
		userRepo: repositories.NewUserRepository(),
	}
}

func (h *UserHandler) GetAll(c *gin.Context) {
	users, err := h.userRepo.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success":   false,
			"message":   "An error occurred while retrieving users.",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":   true,
		"message":   "Users retrieved successfully.",
		"data":      users,
		"timestamp": time.Now().Format(time.RFC3339),
	})
}
