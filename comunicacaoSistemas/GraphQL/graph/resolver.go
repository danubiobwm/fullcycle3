package graph

import "github.com/danubiobwm/fullcycle3/comunicacaoSistemas/GraphQL/internal/database"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct{
    CategoryDB *database.Category
    CourseDB *database.Course
}
