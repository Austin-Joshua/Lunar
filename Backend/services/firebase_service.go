package services

import (
	"context"
	"fmt"
	"log"

	"firebase.google.com/go/v4/messaging"
	"lunar-backend/config"
)

type FirebaseService struct {
	Client *messaging.Client
}

func NewFirebaseService() (*FirebaseService, error) {
	if config.MessagingClient == nil {
		return nil, fmt.Errorf("firebase messaging client not initialized")
	}

	return &FirebaseService{
		Client: config.MessagingClient,
	}, nil
}

// SendNotification sends a push notification to a specific device token
func (s *FirebaseService) SendNotification(ctx context.Context, token string, title string, body string) error {
	message := &messaging.Message{
		Notification: &messaging.Notification{
			Title: title,
			Body:  body,
		},
		Token: token,
	}

	response, err := s.Client.Send(ctx, message)
	if err != nil {
		return fmt.Errorf("error sending message: %v", err)
	}

	log.Printf("Successfully sent message: %s", response)
	return nil
}
