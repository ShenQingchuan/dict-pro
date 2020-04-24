'use strict';

exports.t = src => {
  return Object.assign({}, src);
};
exports.Required = type => {
  type.required = true;
  return type;
};
exports.Unique = type => {
  type.unique = true;
  return type;
};
exports.SetDefault = (type, value) => {
  type.default = value;
  return type;
};
const NotRequiredBase = () => {
  return {
    required: false,
  };
};
exports.NotSelect = type => {
  type.select = false;
  return type;
};
const AssignType = (typeObj, type) => {
  typeObj.type = type;
  return typeObj;
};

exports.StringType = AssignType(NotRequiredBase(), String);
exports.DateType = AssignType(NotRequiredBase(), Date);
exports.NumberType = AssignType(NotRequiredBase(), Number);
