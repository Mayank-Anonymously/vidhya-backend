const express = require("express");
const brouter = express.Router();

const upload = require("../middleware/pageImageUpload");
const {
  AddNewblogs,
  GetAllblogs,
  GetblogssByUrl,
} = require("../controller/blogsController");

brouter.post("/add", upload.single("file"), AddNewblogs);
brouter.get("/all", GetAllblogs);
brouter.get("/:url", GetblogssByUrl);

module.exports = brouter;