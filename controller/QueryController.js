const Query = require('../model/query'); // Your Mongoose model
const sendEmail = require('../utils/SendEmail');

const sendQuery = async (req, res) => {
	try {
		const { name, phone, email, country, university } = req.body;
		const ticketNumber = 'VR-' + Date.now(); // Simple unique ticket number

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
			message: 'Query saved and email sent successfully.',
			data: newQuery,
		});
	} catch (error) {
		console.error('Error saving query or sending email:', error);
		return res.status(500).json({
			success: false,
			message: 'Failed to save query or send email.',
			error: error.message,
		});
	}
};

module.exports = { sendQuery };
