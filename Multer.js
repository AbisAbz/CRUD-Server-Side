const multer = require("multer");
const path = require("path");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/webp": "webp",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid image type");

   
    const imageDirectory = path.join(__dirname, "../front-end/public/images");

    if (isValid) {
      uploadError = null;
    }

    cb(uploadError, imageDirectory);
  },
  filename: function (req, file, cb) {
    // Use a unique filename to avoid conflicts
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadOptions = multer({ storage: storage });

module.exports = uploadOptions; // Export multer instance
