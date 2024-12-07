require('dotenv').config()
const express = require('express')
const ItineraryModel = require('./service/itineraryService')
const { initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin');
const { getAuth } = require("firebase-admin/auth");

const app = express()
const firebaseApp = initializeApp({
	credential: admin.credential.applicationDefault(), // <= THIS!
});
const port = 8080
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.post('/itinerary', async (req, res) => {
	//validating header 
	const header = req.headers['authorization'];

	getAuth()
		.verifyIdToken(header)
		.then((decodedToken) => {
			const uid = decodedToken.uid;
			console.log("Token verified" + uid);
		})
		.catch((error) => {
			console.log(error);
		});
	console.log(req.body)
	const { destination, days } = req.body;
	const model = new ItineraryModel(process.env.GEMINI_API_KEY, "gemini-1.5-flash");
	const result = await model.getItinerary(destination, days)
	console.log(result);
	res.send(result)
})
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})