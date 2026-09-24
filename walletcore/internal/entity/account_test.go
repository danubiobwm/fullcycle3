package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateAccount(t *testing.T) {
	client, _ := NewClient("John Doe", "j@j")
	account := NewAccount(client)
	assert.NotNil(t, account)
	assert.Equal(t, client, account.Client)
	if account == nil {
		t.Errorf("Expected account to be created, got nil")
	}

}

func TestCreateAccountWithNilClient(t *testing.T) {
	account := NewAccount(nil)
	assert.Nil(t, account)

}

func TestCreditAccount(t *testing.T) {
	client, _ := NewClient("John Doe", "j@j")
	account := NewAccount(client)
	account.Credit(100.0)
	assert.Equal(t, 100.0, account.Balance)
}

func TestDebitAccount(t *testing.T) {
	client, _ := NewClient("John Doe", "j@j")
	account := NewAccount(client)
	account.Credit(100.0)
	account.Debit(50.0)
	assert.Equal(t, 50.0, account.Balance)
}
