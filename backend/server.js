require('dotenv').config()
const express = require('express')
const ItineraryModel = require('./service/itineraryService')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/itinerary', async (req, res) => {
	const model = new ItineraryModel(process.env.GEMINI_API_KEY, "gemini-1.5-flash");
	const result = await model.getItinerary("Thailand", 3)
	console.log(result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})