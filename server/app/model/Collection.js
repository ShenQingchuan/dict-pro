'use strict';
const { Required, DateType, StringType, NumberType, SetDefault, t } = require('../utils/SchemaTypes');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CollectionDefinition = {
    userId: {
      type: Schema.Types.ObjectId,
      unique: true,
    },
    collections: [{
      wordChapter: Required(t(StringType)),
      wordId: {
        type: Schema.Types.ObjectId,
        unique: true,
      },
      createTime: Required(t(DateType)),
      lastHitTime: Required(t(DateType)),
      status: SetDefault(t(NumberType), 1),
    }],
  };
  const CollectionSchema = new Schema(CollectionDefinition);

  return mongoose.model('Collection', CollectionSchema, '_collection_');
};
