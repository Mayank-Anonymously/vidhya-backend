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
		} = req.body;
		// validation
		if (
			!meta_title ||
			!meta_keywords ||
			!meta_description ||
			!category ||
			!page_url ||
			!page_image_tag ||
			!title ||
			!page_content
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

		const newPage = new Universities({
			meta_title,
			meta_keywords,
			meta_description,
			category,
			page_url,
			page_image_tag,
			title,
			page_content,
			image, // only one image stored
		});
		console.log(image);
		await newPage.save();

		res.status(201).json({
			baseResponse: { message: 'UNIVERSITY_ADDED', status: 1 },
			response: newPage,
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

module.exports = {
	AddNewUniversity,
	GetAllUniversity,
	GetUniversityByUrl,
};
