const mongoose = require("mongoose");

const { partSchema } = require("./part.schema");

mongoose.model(process.env.DB_PARTS_MODEL, partSchema, process.env.DB_PARTS_COLLECTION); 

