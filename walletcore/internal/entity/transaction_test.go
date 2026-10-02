package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateTransaction(t *testing.T) {
	client1, err := NewClient("John Doe", "john@j.com")
	assert.NoError(t, err)
	account1 := NewAccount(client1)
	assert.NotNil(t, account1)

	client2, err := NewClient("Jane Doe", "jane@j.com")
	assert.NoError(t, err)
	account2 := NewAccount(client2)
	assert.NotNil(t, account2)

	account1.Credit(1000)
	account2.Credit(5000)

	transaction, err := NewTransaction(account1, account2, 250)
	assert.NoError(t, err)
	assert.NotNil(t, transaction)
	assert.Equal(t, 250.0, transaction.Amount)
	assert.Equal(t, 750.0, account1.Balance)
	assert.Equal(t, 5250.0, account2.Balance)
}

func TestCreateTransactionWithInvalidAmount(t *testing.T) {
	client1, _ := NewClient("John Doe", "john@j.com")
	account1 := NewAccount(client1)
	client2, _ := NewClient("Jane Doe", "jane@j.com")
	account2 := NewAccount(client2)

	account1.Credit(100)
	account2.Credit(100)

	transaction, err := NewTransaction(account1, account2, 0)
	assert.Nil(t, transaction)
	assert.Error(t, err)
}

func TestCreateTransactionWithInsufficientFunds(t *testing.T) {
	client1, _ := NewClient("John Doe", "john@j.com")
	account1 := NewAccount(client1)
	client2, _ := NewClient("Jane Doe", "jane@j.com")
	account2 := NewAccount(client2)

	account1.Credit(100)
	account2.Credit(100)

	transaction, err := NewTransaction(account1, account2, 200)
	assert.Nil(t, transaction)
	assert.Error(t, err)
}

func TestCreateTransactionWithNilAccounts(t *testing.T) {
	client, _ := NewClient("John Doe", "john@j.com")
	account := NewAccount(client)
	account.Credit(100)

	transaction, err := NewTransaction(nil, account, 50)
	assert.Nil(t, transaction)
	assert.Error(t, err)

	transaction, err = NewTransaction(account, nil, 50)
	assert.Nil(t, transaction)
	assert.Error(t, err)
}
