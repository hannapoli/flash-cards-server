const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads/words'));
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueName + extension);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const extension = path.extname(file.originalname).toLowerCase();
    if (!file.mimetype.startsWith('image/') || !allowedExtensions.includes(extension)) {
        return cb(new Error('Solo se permiten archivos de imagen'), false);
    }
    //cb(error, acceptFile)
    cb(null, true);
};

const upload = multer({ 
    storage,
    fileFilter,
    limits: {fileSize: 3 * 1024 * 1024 } // 3 MB

});

module.exports = { 
    uploadSingleImg: upload.single('image'),
    uploadMultiImg: upload.array('images', 5)
};
