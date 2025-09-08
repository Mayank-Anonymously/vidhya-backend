const mongoose = require('mongoose');

const couuntires = new mongoose.Schema(
	{
		meta_title: { type: String, required: true },
		meta_keywords: { type: String, required: true },
		meta_description: { type: String, required: true },
		page_url: { type: String, required: true },
		title: { type: String, required: true },
		page_content: { type: String, required: true },
		country_name: { type: String, required: true },
	},
	{ timestamps: true }
);

const couuntiresModel = mongoose.model('Countries', couuntires);

module.exports = couuntiresModel;
