package config

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"

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
	
	// Credentials: FIREBASE_SERVICE_ACCOUNT_JSON, or FIREBASE_SERVICE_ACCOUNT as JSON (starts with '{') or file path.
	var opt option.ClientOption
	jsonCreds := os.Getenv("FIREBASE_SERVICE_ACCOUNT_JSON")
	credOrPath := os.Getenv("FIREBASE_SERVICE_ACCOUNT")
	switch {
	case jsonCreds != "":
		opt = option.WithCredentialsJSON([]byte(jsonCreds))
	case strings.TrimSpace(credOrPath) != "" && strings.HasPrefix(strings.TrimSpace(credOrPath), "{"):
		opt = option.WithCredentialsJSON([]byte(credOrPath))
	case credOrPath != "":
		opt = option.WithCredentialsFile(credOrPath)
	default:
		return fmt.Errorf("set FIREBASE_SERVICE_ACCOUNT (path or inline JSON) or FIREBASE_SERVICE_ACCOUNT_JSON")
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
