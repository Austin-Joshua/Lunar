package controllers

import (
	"net/http"
	"strconv"
	"time"

	"lunar-backend/services"

	"github.com/gin-gonic/gin"
)

type ProductHandler struct {
	productService *services.ProductService
}

func NewProductHandler() *ProductHandler {
	return &ProductHandler{
		productService: services.NewProductService(),
	}
}

func (h *ProductHandler) GetAll(c *gin.Context) {
	limitStr := c.DefaultQuery("limit", "20")
	pageStr := c.DefaultQuery("page", "1")

	limit := 20
	page := 1

	if l, err := strconv.Atoi(limitStr); err == nil && l > 0 {
		limit = l
	}
	if p, err := strconv.Atoi(pageStr); err == nil && p > 0 {
		page = p
	}
	offset := (page - 1) * limit

	products, err := h.productService.GetAll(limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success":   false,
			"message":   "An error occurred while retrieving products.",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":   true,
		"message":   "Products retrieved successfully.",
		"data":      products,
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (h *ProductHandler) GetByID(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"success":   false,
			"message":   "Product ID is required",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	product, err := h.productService.GetByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success":   false,
			"message":   "Product not found.",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":   true,
		"message":   "Product retrieved successfully.",
		"data":      product,
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (h *ProductHandler) GetByGender(c *gin.Context) {
	gender := c.Param("gender")

	products, err := h.productService.GetByGender(gender)
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
		"message":   "Products retrieved successfully.",
		"data":      products,
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (h *ProductHandler) GetByGenderOrID(c *gin.Context) {
	genderOrID := c.Param("gender")

	validGenders := map[string]bool{"men": true, "women": true, "kids": true}

	if validGenders[genderOrID] {
		h.GetByGender(c)
		return
	}

	// In Firestore, numeric-looking strings might still be IDs.
	// But we usually distinguish them by the fact they don't match a gender.
	c.Params = append(c.Params, gin.Param{Key: "id", Value: genderOrID})
	h.GetByID(c)
}

func (h *ProductHandler) GetByGenderAndCategory(c *gin.Context) {
	gender := c.Param("gender")
	category := c.Param("category")

	products, err := h.productService.GetByGenderAndCategory(gender, category)
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
		"message":   "Products retrieved successfully.",
		"data":      products,
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (h *ProductHandler) Search(c *gin.Context) {
	query := c.Query("q")

	if query == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"success":   false,
			"message":   "Search query is required.",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	products, err := h.productService.Search(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success":   false,
			"message":   "An error occurred while searching products.",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":   true,
		"message":   "Search completed successfully.",
		"data":      products,
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (h *ProductHandler) Create(c *gin.Context) {
	var input services.CreateProductInput
	if err := h.shouldBindJSON(c, &input); err != nil {
		return
	}

	product, err := h.productService.Create(input)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success":   false,
			"message":   "An error occurred while creating the product.",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success":   true,
		"message":   "Product created successfully.",
		"data":      product,
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (h *ProductHandler) Update(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"success":   false,
			"message":   "Product ID is required",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	var input services.UpdateProductInput
	if err := h.shouldBindJSON(c, &input); err != nil {
		return
	}

	product, err := h.productService.Update(id, input)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success":   false,
			"message":   "Product not found.",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":   true,
		"message":   "Product updated successfully.",
		"data":      product,
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (h *ProductHandler) Delete(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"success":   false,
			"message":   "Product ID is required",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	if err := h.productService.Delete(id); err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success":   false,
			"message":   "Product not found.",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":   true,
		"message":   "Product deleted successfully.",
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (h *ProductHandler) shouldBindJSON(c *gin.Context, input interface{}) error {
	if err := c.ShouldBindJSON(input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success":   false,
			"message":   "Invalid input data.",
			"timestamp": time.Now().Format(time.RFC3339),
		})
		return err
	}
	return nil
}
