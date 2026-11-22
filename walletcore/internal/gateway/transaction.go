package gateway

import "github.com/danubiobwm/fullcycle3/walletcore/internal/entity"

type TransactionGateway interface {
	Create(transaction *entity.Transaction) error
}
