'use strict';

const WordDefinition = require('../utils/WordDefinition');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const WordSchema = new Schema(WordDefinition);
  return mongoose.model('DictionaryB', WordSchema, 'dictionary-b');
};
