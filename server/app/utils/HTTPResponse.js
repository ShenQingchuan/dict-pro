'use strict';

function HTTPResponse(code, msg, data) {
  const res = {};
  if (code !== undefined) res.code = code;
  if (msg !== undefined) res.msg = msg;
  if (data !== undefined) res.data = data;
  return res;
}

module.exports = HTTPResponse;
