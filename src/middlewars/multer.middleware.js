import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
     
      cb(null, file.originalname)    // TODO  check file.originalname and add functionality that resovle name conflicts 
    }
    
  })
  
 export const upload = multer({ storage })