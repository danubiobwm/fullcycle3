package main

import (
	"database/sql"
	"net"

	"github.com/danubiobwm/fullcycle3/comunicacaoSistemas/grpc/internal/database"
	"github.com/danubiobwm/fullcycle3/comunicacaoSistemas/grpc/internal/pb"
	"github.com/danubiobwm/fullcycle3/comunicacaoSistemas/grpc/internal/service"
	_ "github.com/mattn/go-sqlite3"
	"google.golang.org/grpc"
)

func main() {
	db, err := sql.Open("sqlite3", "./db.sqlite")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	categoryDb := database.NewCategory(db)
	categoryService := service.NewCategoryService(*categoryDb)

	grpcServer := grpc.NewServer()

	pb.RegisterCategoryServiceServer(grpcServer, categoryService)

	lis, err := net.Listen("tcp", ":50051")

	if err != nil {
		panic(err)
	}

	if err := grpcServer.Serve(lis); err != nil {
		panic(err)
	}

}
