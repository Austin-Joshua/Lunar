package main

import (
	"log"
	"os"
	"runtime"
	"time"

	"github.com/gin-gonic/gin"
	"lunar-backend/config"
	"lunar-backend/middlewares"
	"lunar-backend/routes"
)

func main() {
	config.LoadEnv()

	if os.Getenv("JWT_SECRET") == "" {
		log.Println("⚠️  JWT_SECRET not found in .env file, using default")
		os.Setenv("JWT_SECRET", "lunar_jwt_secret_key_2024_default")
	}

	if err := config.InitFirebase(); err != nil {
		log.Fatalf("Failed to initialize Firebase: %v", err)
	}
	defer config.CloseFirebase()

	if os.Getenv("NODE_ENV") == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	app := gin.New()

	// Global Middlewares
	app.Use(middlewares.Logger())
	app.Use(middlewares.Recovery())
	app.Use(middlewares.CORS())
	app.Use(middlewares.RateLimit(20, 10)) // 20 req/s, burst of 10
	app.Use(middlewares.ErrorHandler())

	app.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":    "OK",
			"message":   "Lunar API (Firebase) is running",
			"timestamp": time.Now().Format(time.RFC3339),
		})
	})

	routes.SetupRoutes(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}

	numCPU := runtime.NumCPU()
	runtime.GOMAXPROCS(numCPU)

	log.Printf(`
╭─────────────────────────────────────────╮
│   LUNAR API Server Started Successfully │
├─────────────────────────────────────────╤
│  Port: %s
│  Environment: %s
│  CORS Origin: %s
│  CPUs: %d
╰─────────────────────────────────────────╯
`, port, os.Getenv("NODE_ENV"), os.Getenv("CORS_ORIGIN"), numCPU)

	if err := app.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
