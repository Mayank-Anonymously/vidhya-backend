const countriesModel = require('../model/countriesModel');

const AddNewCountries = (req, res) => {
	const {
		meta_title,
		meta_keywords,
		meta_description,
		page_url,
		page_image_tag,
		title,
		page_content,
	} = req.body;

	// Validate required fields
	if (
		!meta_title ||
		!meta_keywords ||
		!meta_description ||
		!page_url ||
		!title ||
		!page_content
	) {
		return res.status(400).json({
			baseResponse: {
				message: 'BAD_REQUEST',
				status: 0,
			},
		});
	}

	try {
		const newPage = new countriesModel({
			meta_title,
			meta_keywords,
			meta_description,
			page_url,
			page_image_tag,
			title,
			page_content,
		});

		// You probably want to save it
		newPage.save();

		return res.status(200).json({
			baseResponse: { message: 'COUNTRY_ADDED', status: 1 },
			response: newPage,
		});
	} catch (error) {
		console.error('Error creating country page:', error);
		return res.status(500).json({
			baseResponse: { message: 'INTERNAL_SERVER_ERROR', status: 0 },
			response: [],
		});
	}
};

// Get all pages
const GetAllCountries = async (req, res) => {
	try {
		const pages = await countriesModel.find();
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

const GetCountriesByUrl = async (req, res) => {
	try {
		const { url } = req.params;

		if (!url) {
			return res.status(400).json({
				baseResponse: { message: 'BAD_REQUEST - Missing URL', status: 0 },
				response: [],
			});
		}

		const page = await countriesModel.findOne({ page_url: url });

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
	AddNewCountries,
	GetAllCountries,
	GetCountriesByUrl,
};
