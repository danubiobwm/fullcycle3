package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestNewClient(t *testing.T) {
	name := "John Doe"
	email := "john.doe@example.com"

	client, err := NewClient(name, email)
	if err != nil {
		t.Fatalf("Failed to create client: %v", err)
	}

	if client.ID == "" {
		t.Error("Expected client ID to be generated")
	}

	assert.Equal(t, name, client.Name, "Expected client name to match")
	assert.Equal(t, email, client.Email, "Expected client email to match")
	if client.CreatedAt.IsZero() {
		t.Error("Expected client CreatedAt to be set")
	}
}

func TestNewClientValidation(t *testing.T) {
	client, err := NewClient("", "")
	assert.Nil(t, client, "Expected client to be nil for invalid input")
	assert.Error(t, err, "Expected error for invalid input")
}
