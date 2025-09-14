const express = require("express");
const {
  sendQuery,
  GenerateQueryNormalQuery,
  GetAllQueries,
} = require("../controller/QueryController");
const queryroute = express.Router();

queryroute.post("/raise-query", sendQuery);
queryroute.post("/raise-direct-query", GenerateQueryNormalQuery);
queryroute.get("/get-all-queries", GetAllQueries);

module.exports = queryroute;
