package controllers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"lunar-backend/services"
)

type NotificationController struct {
	FirebaseService *services.FirebaseService
}

func NewNotificationController(firebaseService *services.FirebaseService) *NotificationController {
	return &NotificationController{
		FirebaseService: firebaseService,
	}
}

// PushNotificationRequest defines the data required to send a targeted push
type PushNotificationRequest struct {
	Token string `json:"token" binding:"required"`
	Title string `json:"title" binding:"required"`
	Body  string `json:"body" binding:"required"`
}

// SendNotification handles the HTTP request to trigger a real-time push notification
func (nc *NotificationController) SendNotification(c *gin.Context) {
	var req PushNotificationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid push notification parameters"})
		return
	}

	// Trigger asynchronous notification dispatch using Go routines
	go func() {
		ctx := context.Background()
		err := nc.FirebaseService.SendNotification(ctx, req.Token, req.Title, req.Body)
		if err != nil {
			// In production, log this to an external monitoring service
			return
		}
	}()

	c.JSON(http.StatusOK, gin.H{
		"message": "Real-time push notification successfully enqueued",
		"status":  "QUEUED",
	})
}
