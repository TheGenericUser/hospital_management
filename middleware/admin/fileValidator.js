const fileValidator = (req, res, next) => {
    const files = req.file ? [req.file] : req.files;
  
    if (files && files.length > 0) {
      const maxSize = 10 * 1024 * 1024;
      
      for (const file of files) {
        if (file.mimetype !== 'application/pdf') {
          return res.status(400).json({ message: 'All report files must be PDFs.' });
        }
  
        if (file.size > maxSize) {
          return res.status(400).json({ message: 'Each report file must be less than 10MB.' });
        }
      }
    }
    next();
};

module.exports = { fileValidator };