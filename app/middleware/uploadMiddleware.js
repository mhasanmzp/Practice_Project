const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, 'uploads/')
    },

    filename: function(req, file, cb){
        const fileSuffix = Date.now() + '-' + Math.round(Math.random()* 10000);
        cb(null, fileSuffix + path.extname(file.originalname)); 
    }
})

const upload = multer({
    storage: storage
})

module.exports = upload;