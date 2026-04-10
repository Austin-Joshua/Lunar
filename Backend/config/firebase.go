package config

import (
	"context"
	"log"
	"os"

	firebase "firebase.google.com/go/v4"
	"cloud.google.com/go/firestore"
	"firebase.google.com/go/v4/messaging"
	"google.golang.org/api/option"
)

var (
	FirebaseApp     *firebase.App
	FirestoreClient *firestore.Client
	MessagingClient *messaging.Client
)

func InitFirebase() error {
	ctx := context.Background()
	
	// Load credentials:
	// 1. Check for JSON string (ideal for cloud/Render)
	// 2. Fallback to file path (ideal for local/dev)
	var opt option.ClientOption
	if jsonCreds := os.Getenv("FIREBASE_SERVICE_ACCOUNT_JSON"); jsonCreds != "" {
		opt = option.WithCredentialsJSON([]byte(jsonCreds))
	} else if credPath := os.Getenv("FIREBASE_SERVICE_ACCOUNT"); credPath != "" {
		opt = option.WithCredentialsFile(credPath)
	}


	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		return err
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		return err
	}

	FirebaseApp = app
	FirestoreClient = client

	msgClient, err := app.Messaging(ctx)
	if err == nil {
		MessagingClient = msgClient
		log.Println("✅ Firebase Messaging initialized successfully")
	}

	log.Println("✅ Firebase Firestore initialized successfully")
	return nil
}

func CloseFirebase() {
	if FirestoreClient != nil {
		FirestoreClient.Close()
	}
}
