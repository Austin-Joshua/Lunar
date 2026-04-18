package routes

import (
	"context"
	"net/http"
	"time"

	"lunar-backend/config"
	"lunar-backend/controllers"
	"lunar-backend/middlewares"

	"lunar-backend/services"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/iterator"
)

func SetupRoutes(app *gin.Engine) {
	authHandler := controllers.NewAuthHandler()
	productHandler := controllers.NewProductHandler()
	orderHandler := controllers.NewOrderHandler()
	categoryHandler := controllers.NewCategoryHandler()
	userHandler := controllers.NewUserHandler()

	firebaseService, _ := services.NewFirebaseService()
	notificationHandler := controllers.NewNotificationController(firebaseService)

	api := app.Group("/api")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/register", authHandler.Register)
			auth.POST("/login", authHandler.Login)
			auth.POST("/google", authHandler.GoogleLogin)
			auth.POST("/refresh-token", authHandler.RefreshToken)
			auth.POST("/logout", authHandler.Logout)

			auth.GET("/profile", middlewares.AuthMiddleware(), authHandler.GetProfile)
			auth.POST("/logout-all", middlewares.AuthMiddleware(), authHandler.LogoutAll)
		}

		products := api.Group("/products")
		{
			products.GET("/search", productHandler.Search)
			products.GET("", productHandler.GetAll)
			products.GET("/:gender/:category", productHandler.GetByGenderAndCategory)
			products.GET("/:gender", productHandler.GetByGenderOrID)
			products.GET("/id/:id", productHandler.GetByID)

			products.POST("", middlewares.AuthMiddleware(), middlewares.AdminMiddleware(), productHandler.Create)
			products.PUT("/id/:id", middlewares.AuthMiddleware(), middlewares.AdminMiddleware(), productHandler.Update)
			products.DELETE("/id/:id", middlewares.AuthMiddleware(), middlewares.AdminMiddleware(), productHandler.Delete)
		}

		orders := api.Group("/orders")
		{
			orders.GET("/my-orders", middlewares.AuthMiddleware(), orderHandler.GetMyOrders)
			orders.GET("/:id", middlewares.AuthMiddleware(), orderHandler.GetByID)
			orders.POST("", middlewares.AuthMiddleware(), orderHandler.Create)

			orders.GET("", middlewares.AuthMiddleware(), middlewares.AdminMiddleware(), orderHandler.GetAll)
			orders.PUT("/:id/status", middlewares.AuthMiddleware(), middlewares.AdminMiddleware(), orderHandler.UpdateStatus)
		}

		categories := api.Group("/categories")
		{
			categories.GET("", categoryHandler.GetAll)
			categories.GET("/:gender", categoryHandler.GetByGender)
			categories.POST("", middlewares.AuthMiddleware(), middlewares.AdminMiddleware(), categoryHandler.Create)
		}

		users := api.Group("/users")
		{
			users.GET("", middlewares.AuthMiddleware(), middlewares.AdminMiddleware(), userHandler.GetAll)
		}

		notifications := api.Group("/notifications")
		{
			notifications.POST("/send", middlewares.AuthMiddleware(), middlewares.AdminMiddleware(), notificationHandler.SendNotification)
		}

		api.GET("/admin/stats", middlewares.AuthMiddleware(), middlewares.AdminMiddleware(), func(c *gin.Context) {
			ctx := context.Background()
			
			// Note: Firestore doesn't provide specialized count functions without fetching all IDs/Docs in current version
			// For a small/medium store, iterating or using a separate counter doc is best.
			// Here we'll do simple counting for migration parity.
			
			countCollection := func(coll string) (int, error) {
				iter := config.FirestoreClient.Collection(coll).Select().Documents(ctx)
				defer iter.Stop()
				count := 0
				for {
					_, err := iter.Next()
					if err == iterator.Done {
						break
					}
					if err != nil {
						return 0, err
					}
					count++
				}
				return count, nil
			}

			totalUsers, _ := countCollection("users")
			totalProducts, _ := countCollection("products")
			totalOrders, _ := countCollection("orders")

			var totalRevenue float64
			iter := config.FirestoreClient.Collection("orders").Where("status", "!=", "cancelled").Documents(ctx)
			defer iter.Stop()
			for {
				doc, err := iter.Next()
				if err == iterator.Done {
					break
				}
				if err != nil {
					break
				}
				totalPrice := doc.Data()["total_price"].(float64)
				totalRevenue += totalPrice
			}

			c.JSON(http.StatusOK, gin.H{
				"success": true,
				"data": gin.H{
					"totalUsers":    totalUsers,
					"totalProducts": totalProducts,
					"totalOrders":   totalOrders,
					"totalRevenue":  totalRevenue,
				},
				"timestamp": time.Now().Format(time.RFC3339),
			})
		})
	}

	app.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{
			"success":   false,
			"message":   "Route not found: " + c.Request.Method + " " + c.Request.URL.Path,
			"timestamp": time.Now().Format(time.RFC3339),
		})
	})
}
