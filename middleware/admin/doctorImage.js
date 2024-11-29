const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadImage = (folder) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = `./public/uploads/${folder}`;
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true }); // Create folder if not exists
      }
      cb(null, uploadDir);  // Set the destination folder
    },
    filename: (req, file, cb) => {
      // Create a unique file name with timestamp
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(new Error('Only image files are allowed!'));
    }
  });

  // Return a promise that resolves with the file path after the file is uploaded
  return (req, res, next) => {
    upload.single('doctorPicture')(req, res, (err) => {
      if (err) {
        return next(err);
      }

      if (req.file) {
        const filepath = `/uploads/${folder}/${req.file.filename}`;
        req.filepath = filepath;
      }
      next();
    });
  };
};

module.exports = { uploadImage };