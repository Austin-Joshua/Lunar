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
	
	// Load credentials from file if GOOGLE_APPLICATION_CREDENTIALS is set,
	// otherwise use default credentials or service account JSON from environment.
	var opt option.ClientOption
	credPath := os.Getenv("FIREBASE_SERVICE_ACCOUNT")
	if credPath != "" {
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
