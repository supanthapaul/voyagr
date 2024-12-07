const { SchemaType } = require("@google/generative-ai");


module.exports.itineraryModelSchema =  {
  description: "Itinerary list by day",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      highlight: {
        type: SchemaType.STRING,
        description: "string of short highlight of the day in few words",
        nullable: false,
      },
			activities: {
				type: SchemaType.ARRAY,
				items: {
					type: SchemaType.STRING,
					description: "strings which are the things to for that day",
					nullable: false,
				}
			}
    },
    required: ["highlight", "activities"],
  },
};