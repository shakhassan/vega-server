var mongoose = require('mongoose');

// Create a schema
var vegaSchema = new mongoose.Schema({
  id: String,
  title: String,
  method: String,
  url: String,
  body: String,
  headersKey1: String,
  headersValue1: String,
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Vega', vegaSchema);

// Create a model based on the schema
// var Vega = mongoose.model('Vega', vegaSchema);
