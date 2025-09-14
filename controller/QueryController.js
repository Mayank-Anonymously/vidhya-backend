const Query = require("../model/query"); // Your Mongoose model
const sendEmail = require("../utils/SendEmail");

const sendQuery = async (req, res) => {
  try {
    const { name, phone, email, country, university } = req.body;
    const ticketNumber = "VR-" + Date.now(); // Simple unique ticket number

    // 1️⃣ Save query in DB
    const newQuery = await Query.create({
      name,
      phone,
      email,
      country,
      university,
      ticketNumber,
    });

    // 2️⃣ Send email only after saving is successful
    await sendEmail(email, name, ticketNumber, req, res);

    // 3️⃣ Respond to client
    return res.status(201).json({
      success: true,
      message: "Query saved and email sent successfully.",
      data: newQuery,
    });
  } catch (error) {
    console.error("Error saving query or sending email:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save query or send email.",
      error: error.message,
    });
  }
};

const GenerateQueryNormalQuery = async (req, res) => {
  try {
    const { name, phone, email, query } = req.body;

    // 1️⃣ Save query in DB
    const newQuery = await Query.create({
      name,
      phone,
      email,
      query,
    });

    // 3️⃣ Respond to client
    return res.status(201).json({
      success: true,
      message: "Query saved  successfully.",
      data: newQuery,
    });
  } catch (error) {
    console.error("Error saving query or sending email:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save query or send email.",
      error: error.message,
    });
  }
};

const GetAllQueries = async (req, res) => {
  const findAllQuery = await Query.find({});
  if (findAllQuery) {
    res.status(200).json({
      baseResponse: { message: "STATUS_OK", status: 1 },
      response: findAllQuery,
    });
  } else {
    res.status(200).json({
      baseResponse: { message: "INTERNAL_SERVER_ERROR", status: 0 },
      response: [],
    });
  }
};
module.exports = { sendQuery, GenerateQueryNormalQuery, GetAllQueries };
