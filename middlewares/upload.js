const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './storage/');
    },
    filename: function(req, file, cb) {
        console.log('file',file)
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = function(req, file, cb) {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'|| file.mimetype === 'image/png'|| file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

module.exports = multer({

    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
    //fileFilter: fileFilter
});