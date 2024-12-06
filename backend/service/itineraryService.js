const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = class ItineraryModel {
	constructor(apiKey, geminiModelName) {
		this.modelName = geminiModelName;
		this.genAI = new GoogleGenerativeAI(apiKey);
		this.model = this.genAI.getGenerativeModel({ model: this.modelName });
		//this.model.systemInstruction = "Always generate valid JSON as output, nothing apart from the JSON should be returned.";
	}

	changeModel(geminiModelName) {
		this.model = this.genAI.getGenerativeModel({geminiModelName})
	}

	async getItinerary(destination, days) {
		const prompt = `Generate valid JSON array of objects for a trip itinerary for the destination of ${destination}. The trip is of ${days} days. The JSON array should have ${days} objects, each with the itinerary of that day. The itinerary object for each day should have the following keys: highlight - string of short highlight of the day in few words, items - array of strings which are the things to for that day.`;
		try {
			const result = await this.model.generateContent(prompt);
			return result.response.text();
		}
		catch (err) {
			return {
				error: "Failed to generate response",
				message: err
			}
		}
	}
}