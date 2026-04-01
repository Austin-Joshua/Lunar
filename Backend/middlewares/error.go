package middlewares

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
)

func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()

		if len(c.Errors) > 0 {
			err := c.Errors.Last()
			log.Printf("❌ Error [%s]: %v", time.Now().Format(time.RFC3339), err)

			statusCode := http.StatusInternalServerError
			message := "An unexpected error occurred"

			if status, ok := c.Get("status_code"); ok {
				if sc, ok := status.(int); ok {
					statusCode = sc
				}
			}

			if msg, ok := c.Get("error_message"); ok {
				if m, ok := msg.(string); ok {
					message = m
				}
			}

			c.JSON(statusCode, gin.H{
				"success":   false,
				"message":   message,
				"timestamp": time.Now().Format(time.RFC3339),
				"stack":     gin.Mode() == gin.DebugMode,
			})
		}
	}
}

func NotFoundHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{
			"success":   false,
			"message":   "Route not found: " + c.Request.Method + " " + c.Request.URL.Path,
			"timestamp": time.Now().Format(time.RFC3339),
		})
	}
}

func SanitizeInput() gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.Method == "POST" || c.Request.Method == "PUT" {
			c.Next()
			return
		}
		c.Next()
	}
}

func Logger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		path := c.Request.URL.Path

		c.Next()

		latency := time.Since(start)
		status := c.Writer.Status()

		if os.Getenv("NODE_ENV") == "development" || os.Getenv("NODE_ENV") == "" {
			log.Printf("%s %s %d %v", c.Request.Method, path, status, latency)
		}
	}
}

// Recovery middleware recovers from any panics and writes a 500 if there was one.
func Recovery() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				log.Printf("[PANIC RECOVERY] Error: %v", err)
				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
					"success":   false,
					"message":   "A critical internal server error occurred.",
					"timestamp": time.Now().Format(time.RFC3339),
				})
			}
		}()
		c.Next()
	}
}
