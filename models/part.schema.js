const mongoose = require("mongoose");

const { compatibleModelsSchema } = require("./compatible-model.schema");

const partSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    partNumber: {
        type: String,
        required: true
    }, 
    description: String,
    compatibleModels: [compatibleModelsSchema]
});

module.exports = {
    partSchema
}