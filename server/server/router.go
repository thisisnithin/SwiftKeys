package server

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-starter/handlers"
)

func NewRouter() *gin.Engine {
	router := gin.New()
	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	router.GET("/health", handlers.Health)
	router.GET("/words/:count", handlers.GetGeneratedWords)
	router.GET("/paragraph", handlers.GetGeneratedParagraph)

	return router
}
