'use strict';
const { Required, Unique, StringType, DateType, NumberType, SetDefault, NotSelect, t } = require('../utils/SchemaTypes');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserDefinition = {
    userName: Required(Unique(t(StringType))),
    password: NotSelect(Required(t(StringType))),
    email: t(StringType),
    phone: t(StringType),
    avatarUrl: t(StringType),
    createTime: Required(t(DateType)),
    updateTime: Required(t(DateType)),
    status: SetDefault(t(NumberType), 1),
  };
  const UserSchema = new Schema(UserDefinition);

  return mongoose.model('User', UserSchema, '_user_');
};
