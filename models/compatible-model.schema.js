const mongoose = require("mongoose");


const compatibleModelsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: [{
        type: Number,
        min: 1990,
        max: 2030
    }]
});

module.exports = {
    compatibleModelsSchema
}