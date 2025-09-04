const services = require('../model/servicesModel');

const AddNewService = (req, res) => {
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

	if (
		(meta_title,
		meta_keywords,
		meta_description,
		category,
		page_url,
		page_image_tag,
		title,
		page_content)
	) {
		res.status(200).json({
			baseResponse: {
				message: 'BAD_REQUEST',
				status: 1,
			},
		});
	} else {
		const newPage = new services({
			meta_title,
			meta_keywords,
			meta_description,
			category,
			page_url,
			page_image_tag,
			title,
			page_content,
		});

		res.status(200).json({
			baseResponse: { message: 'STATUS_OK', status: 1 },
			response: newPage,
		});
	}
	res.status(200).json({
		baseResponse: { message: 'INTERNAL_SERVER_ERROR', status: 0 },
		response: [],
	});
};

// Get all pages
const GetAllService = async (req, res) => {
	try {
		const pages = await services.find();
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

const GetServicesByUrl = async (req, res) => {
	try {
		const { url } = req.params;

		if (!url) {
			return res.status(400).json({
				baseResponse: { message: 'BAD_REQUEST - Missing URL', status: 0 },
				response: [],
			});
		}

		const page = await services.findOne({ page_url: url });

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
	AddNewService,
	GetAllService,
	GetServicesByUrl,
};
