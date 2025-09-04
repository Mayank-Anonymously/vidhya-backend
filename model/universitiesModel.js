const mongoose = require('mongoose');

const univerities = new mongoose.Schema(
	{
		meta_title: { type: String, required: true },
		meta_keywords: { type: String, required: true },
		meta_description: { type: String, required: true },
		category: { type: String, required: true },
		page_url: { type: String, required: true },
		page_image_tag: { type: String, required: true },
		title: { type: String, required: true },
		page_content: { type: String, required: true },
	},
	{ timestamps: true }
);

const universityModel = mongoose.model('universties', univerities);

module.exports = universityModel;
