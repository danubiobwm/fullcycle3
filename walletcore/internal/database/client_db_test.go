package database

import (
	"database/sql"
	"testing"

	"github.com/danubiobwm/fullcycle3/walletcore/internal/entity"
	_ "github.com/mattn/go-sqlite3"
	"github.com/stretchr/testify/suite"
)

type ClientDBTestSuite struct {
	suite.Suite
	db       *sql.DB
	clientDB *ClientDB
}

func (s *ClientDBTestSuite) SetupSuite() {
	db, err := sql.Open("sqlite3", ":memory:")
	s.Require().NoError(err)
	s.db = db
	s.clientDB = NewClientDB(s.db)

	_, err = db.Exec("CREATE TABLE clients(id varchar(255), name varchar(255), email varchar(255), created_at datetime)")
	s.Require().NoError(err)
}

func (s *ClientDBTestSuite) TearDownSuite() {
	s.NoError(s.db.Close())
}

func TestClientDBTestSuite(t *testing.T) {
	suite.Run(t, new(ClientDBTestSuite))
}

func (s *ClientDBTestSuite) TestGet() {
	client, err := entity.NewClient("John Doe", "john@example.com")
	s.Require().NoError(err)
	s.Require().NoError(s.clientDB.Save(client))

	result, err := s.clientDB.Get(client.ID)
	s.Require().NoError(err)
	s.Require().NotNil(result)
	s.Equal(client.ID, result.ID)
	s.Equal(client.Name, result.Name)
	s.Equal(client.Email, result.Email)
	s.True(client.CreatedAt.Equal(result.CreatedAt))

}

func (s *ClientDBTestSuite) TestSave() {
	client, err := entity.NewClient("Jane Doe", "jane@example.com")
	s.Require().NoError(err)
	s.Require().NoError(s.clientDB.Save(client))

	var count int
	err = s.db.QueryRow("SELECT COUNT(*) FROM clients WHERE id = ?", client.ID).Scan(&count)
	s.Require().NoError(err)
	s.Equal(1, count)
}
