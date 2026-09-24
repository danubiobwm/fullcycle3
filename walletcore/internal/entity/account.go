package entity

import (
	"time"

	"github.com/google/uuid"
)

type Account struct {
	ID        string  `json:"id"`
	Client    *Client `json:"client"`
	Balance   float64 `json:"balance"`
	CreatedAt string  `json:"created_at"`
	UpdatedAt string  `json:"updated_at"`
}

func NewAccount(client *Client) *Account {
	if client == nil {
		return nil
	}
	account := &Account{
		ID:        uuid.New().String(),
		Client:    client,
		Balance:   0.0,
		CreatedAt: time.Now().Format(time.RFC3339),
		UpdatedAt: time.Now().Format(time.RFC3339),
	}

	return account

}

func (a *Account) Credit(amount float64) {
	a.Balance += amount
	a.UpdatedAt = time.Now().Format(time.RFC3339)
}

func (a *Account) Debit(amount float64) {
	a.Balance -= amount
	a.UpdatedAt = time.Now().Format(time.RFC3339)
}
