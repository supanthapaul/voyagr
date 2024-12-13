require('dotenv').config()
const express = require('express')
const ItineraryModel = require('./service/itineraryService')
const { initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin');
const { getAuth } = require("firebase-admin/auth");
const autocompleteService = require('./service/autocompleteService');
const getImageService = require('./service/imageService');

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

	try {
		const decodedToken = await getAuth().verifyIdToken(header);
		const uid = decodedToken.uid;
		console.log("User token verified for UID: " + uid);
	}
	catch (err) {
		console.log(err);
		res.status(401).send("Unauthorized to access Itinerary API");
		return;
	}

	const { destination, days } = req.body;
	try {
		const model = new ItineraryModel(process.env.GEMINI_API_KEY, "gemini-1.5-flash");
		const result = await model.getItinerary(destination, days)
		console.log(result);
		res.status(200).send(result)
	}
	catch (err) {
		console.log(err);
		res.status(500).send("Unable to connect to Gemini Service, please try again later.");
	}

})

app.get('/autocomplete', async (req, res) => {
	const header = req.headers['authorization'];

	try {
		const decodedToken = await getAuth().verifyIdToken(header);
		const uid = decodedToken.uid;
		console.log("User token verified for UID: " + uid);
	}
	catch (err) {
		console.log(err);
		res.status(401).send("Unauthorized to access Autocomplete API");
		return;
	}

	try {
		const cityName = req.query.searchQuery;
		const result = await autocompleteService(cityName);
		console.log(result);
		res.status(200).send(result);
	}
	catch (err) {
		console.log(err);
		res.status(500).send("Unable to connect to autocomplete Service, please try again later.");
	}
})

app.get('/image', async (req, res) => {
	const header = req.headers['authorization'];

	try {
		const decodedToken = await getAuth().verifyIdToken(header);
		const uid = decodedToken.uid;
		console.log("User token verified for UID: " + uid);
	}
	catch (err) {
		console.log(err);
		res.status(401).send("Unauthorized to access Images API");
		return;
	}

	try {
		const cityName = req.query.searchQuery;
		const page = req.query.pageQuery
		const result = await getImageService(cityName, page);
		console.log(result);
		res.status(200).send(result);
	}
	catch (err) {
		console.log(err);
		res.status(500).send("Unable to connect to images Service, please try again later.");
	}
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})