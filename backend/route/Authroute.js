const router=require('express').Router()
const logRegController=require('../controller/Authcontroller')
const multer = require('multer')
const path = require('path')
const { userJwt, adminJwt } = require('../middleware/authJwt')

//Storage define
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    
    const ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
  },
})
//Size define
const maxSize = 1 * 1024 * 1024
//Upload method
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only jpg,png,jpeg are allowed'))
    }
  },
  limits: maxSize,
})

router.post('/registration',  upload.single('image') , logRegController.registration)
router.post('/signin',logRegController.signIn)
router.get('/profile', userJwt, logRegController.viewProfile)
router.get('/adminpanel',  logRegController.getAllUsers)




module.exports=router