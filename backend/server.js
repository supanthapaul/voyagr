require('dotenv').config()
const express = require('express')
const ItineraryModel = require('./service/itineraryService')

const app = express()
const port = 8080
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/itinerary', async (req, res) => {
	console.log(req.body)
	const {destination, days} = req.body;
	const model = new ItineraryModel(process.env.GEMINI_API_KEY, "gemini-1.5-flash");
	const result = await model.getItinerary(destination, days)
	console.log(result);
	res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})