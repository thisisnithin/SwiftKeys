package handlers

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"

	"github.com/brianvoe/gofakeit/v6"
)

func GetGeneratedWords(c *gin.Context) {
	count, err := strconv.Atoi(c.Param("count"))

	if err != nil {
		c.String(http.StatusBadRequest, "Invalid count")
		return
	}

	words := strings.Split(strings.ToLower(gofakeit.Sentence(count)), " ")

	c.JSON(http.StatusOK, words)
	return
}
