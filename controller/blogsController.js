const blogss = require("../model/blogsModel");

const AddNewblogs = async (req, res) => {
  console.log("blogshitrecieved");
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
          message: "BAD_REQUEST: Missing required fields",
          status: 0,
        },
      });
    }

    // ✅ Handle uploaded image (single file)
    const image = req.file ? req.file.filename : null;

    const newPage = new blogss({
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
    await newPage.save();

    res.status(201).json({
      baseResponse: { message: "blogs ADDED", status: 1 },
      response: newPage,
    });
  } catch (error) {
    res.status(500).json({
      baseResponse: { message: "INTERNAL_SERVER_ERROR", status: 0 },
      error: error.message,
    });
  }
};

// Get all pages
const GetAllblogs = async (req, res) => {
  try {
    const pages = await blogss.find();
    res.status(200).json({
      baseResponse: { message: "STATUS_OK", status: 1 },
      response: pages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      baseResponse: { message: "INTERNAL_SERVER_ERROR", status: 0 },
      response: [],
    });
  }
};

const GetblogssByUrl = async (req, res) => {
  try {
    const { url } = req.params;

    if (!url) {
      return res.status(400).json({
        baseResponse: { message: "BAD_REQUEST - Missing URL", status: 0 },
        response: [],
      });
    }

    const page = await blogss.findOne({ page_url: url });

    if (!page) {
      return res.status(404).json({
        baseResponse: { message: "page_NOT_FOUND", status: 0 },
        response: [],
      });
    }

    res.status(200).json({
      baseResponse: { message: "STATUS_OK", status: 1 },
      response: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      baseResponse: { message: "INTERNAL_SERVER_ERROR", status: 0 },
      response: [],
    });
  }
};

module.exports = {
  AddNewblogs,
  GetAllblogs,
  GetblogssByUrl,
};
