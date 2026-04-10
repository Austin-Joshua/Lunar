package config

import (
	"log"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	// Repo-root .env when cwd is Backend/, then Backend/.env (local overrides root).
	loaded := false
	if err := godotenv.Load("../.env"); err == nil {
		loaded = true
	}
	if err := godotenv.Load(".env"); err == nil {
		loaded = true
	}
	if !loaded {
		log.Println("No .env at ../.env or .env; using OS environment variables only")
	}
}
