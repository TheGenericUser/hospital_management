const fs = require('fs');
const path = require('path');

const deleteImage = (imagePath) => {
  try {
    const filePath = path.join(process.cwd(), 'public', imagePath);
    if (!fs.existsSync(filePath)) {
      return { success: false, message: 'Image not found' };
    }
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting image:', err);
      }
    });
    return { success: true, message: 'Image deleted successfully' };
  } catch (error) {
    console.error('Error deleting image:', error);
    return { success: false, message: 'Failed to delete image: ' + error.message };
  }
};

module.exports = { deleteImage };