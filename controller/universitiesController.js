const Universities = require('../model/universitiesModel');

const AddNewUniversity = async (req, res) => {
	try {
		const {
			meta_title,
			meta_keywords,
			meta_description,
			category,
			page_url,
			page_image_tag,
			title,
			page_content,
			name,
			location,
			ranking,
			description,
			highlights,
			tuitionRange,
			popularPrograms,
		} = req.body;

		// ✅ Validation (check required fields)
		if (
			!meta_title ||
			!meta_keywords ||
			!meta_description ||
			!category ||
			!page_url ||
			!page_image_tag ||
			!title ||
			!page_content ||
			!name ||
			!location ||
			!ranking ||
			!description ||
			!tuitionRange
		) {
			return res.status(400).json({
				baseResponse: {
					message: 'BAD_REQUEST: Missing required fields',
					status: 0,
				},
			});
		}

		// ✅ Handle uploaded image (single file)
		const image = req.file ? req.file.filename : null;

		// ✅ Parse arrays safely
		let parsedHighlights = [];
		let parsedPrograms = [];

		try {
			if (highlights) parsedHighlights = JSON.parse(highlights);
			if (popularPrograms) parsedPrograms = JSON.parse(popularPrograms);
		} catch (err) {
			console.error('Error parsing JSON fields:', err.message);
		}

		// ✅ Create new document
		const newUniversity = new Universities({
			meta_title,
			meta_keywords,
			meta_description,
			category,
			page_url,
			page_image_tag,
			title,
			page_content,
			image,
			name,
			location,
			ranking,
			description,
			highlights: parsedHighlights,
			tuitionRange,
			popularPrograms: parsedPrograms,
		});

		await newUniversity.save();

		res.status(201).json({
			baseResponse: { message: 'UNIVERSITY_ADDED', status: 1 },
			response: newUniversity,
		});
	} catch (error) {
		console.error('AddNewUniversity error:', error);
		res.status(500).json({
			baseResponse: { message: 'INTERNAL_SERVER_ERROR', status: 0 },
			error: error.message,
		});
	}
};

// Get all pages
const GetAllUniversity = async (req, res) => {
	try {
		const pages = await Universities.find();
		res.status(200).json({
			baseResponse: { message: 'STATUS_OK', status: 1 },
			response: pages,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			baseResponse: { message: 'INTERNAL_SERVER_ERROR', status: 0 },
			response: [],
		});
	}
};

const GetUniversityByUrl = async (req, res) => {
	try {
		const { url } = req.params;

		if (!url) {
			return res.status(400).json({
				baseResponse: { message: 'BAD_REQUEST - Missing URL', status: 0 },
				response: [],
			});
		}

		const page = await Universities.findOne({ page_url: url });

		if (!page) {
			return res.status(404).json({
				baseResponse: { message: 'page_NOT_FOUND', status: 0 },
				response: [],
			});
		}

		res.status(200).json({
			baseResponse: { message: 'STATUS_OK', status: 1 },
			response: page,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			baseResponse: { message: 'INTERNAL_SERVER_ERROR', status: 0 },
			response: [],
		});
	}
};

const GetUniversityByCountryID = async (req, res) => {
	try {
		const { _id } = req.params;

		if (!_id) {
			return res.status(400).json({
				baseResponse: { message: 'BAD_REQUEST - Missing URL', status: 0 },
				response: [],
			});
		}

		const page = await Universities.find({ category: _id });

		if (!page) {
			return res.status(404).json({
				baseResponse: { message: 'page_NOT_FOUND', status: 0 },
				response: [],
			});
		}

		res.status(200).json({
			baseResponse: { message: 'STATUS_OK', status: 1 },
			response: page,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			baseResponse: { message: 'INTERNAL_SERVER_ERROR', status: 0 },
			response: [],
		});
	}
};

module.exports = {
	AddNewUniversity,
	GetAllUniversity,
	GetUniversityByUrl,
	GetUniversityByCountryID,
};
