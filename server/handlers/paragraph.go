package handlers

import (
	"math/rand"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/xuri/excelize/v2"
	"golang.org/x/exp/slices"
)

func GetGeneratedParagraph(c *gin.Context) {
	queryParams := c.Request.URL.Query()
	sentenceCount, err := strconv.Atoi((queryParams.Get("sentenceCount")))
	if err != nil {
		c.String(http.StatusBadRequest, "Invalid sentenceCount")
		return
	}

	// read xls file
	f, err := excelize.OpenFile("data.xlsx")
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}

	rows, err := f.GetRows("Sheet1")
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}

	// get random required number of rows and join them.
	var selectedRowIndices []int
	selectedSentenceCount := 0
	var paragraph strings.Builder

	for {
		index := rand.Intn(len(rows))
		if slices.Contains(selectedRowIndices, index) == false {
			selectedRow := rows[index]
			selectedRowIndices = append(selectedRowIndices, index)
			tempSelectedSentenceCount := selectedSentenceCount + len(selectedRow[1:])
			if tempSelectedSentenceCount < sentenceCount {
				paragraph.WriteString(strings.Join(selectedRow[1:], " "))
				paragraph.WriteString(" ")
				selectedSentenceCount = tempSelectedSentenceCount
			} else {
				paragraph.WriteString(strings.Join(selectedRow[1:sentenceCount-selectedSentenceCount], " "))
				break
			}
		}
	}

	c.JSON(http.StatusOK, paragraph.String())
	return
}
