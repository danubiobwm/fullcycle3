package gateway

import "github.com/danubiobwm/fullcycle3/walletcore/internal/entity"

type ClientGateway interface {
	Get(id string) (*entity.Client, error)
	Save(client *entity.Client) error
}
