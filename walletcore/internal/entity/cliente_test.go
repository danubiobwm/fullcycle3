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

func TestUpdateClient(t *testing.T) {
	client, err := NewClient("John Doe", "john@example.com")
	if err != nil {
		t.Fatalf("Failed to create client: %v", err)
	}

	err = client.Update("Jane Doe", "jane@example.com")
	if err != nil {
		t.Fatalf("Failed to update client: %v", err)
	}

	assert.Equal(t, "Jane Doe", client.Name, "Expected updated client name")
	assert.Equal(t, "jane@example.com", client.Email, "Expected updated client email")
}

func TestUpdateClientWithInvalidArgs(t *testing.T) {
	client, _ := NewClient("John Doe", "j@.com")
	err := client.Update("", "j@.com")
	assert.Error(t, err, "name is required")

}
