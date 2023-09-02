 
import express  from "express";
import { body } from "express-validator";
import { TestController, logincontroller, registercontroller } from "../Controllers/UserController.js";
import { iSTeacher, requireSignIn } from "../Middleware/FetchUser.js";
import upload from "../Middleware/Multer.js";

// route object...
const router = express.Router();

// routing  
//  Register  ||  Method : POST
router.post('/register',[
    body('name','Enter a valid Name').isLength({min:3}), 
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password should contain atleast 8 characters').isLength({min:6}),
], upload.single('image'), registercontroller)

// Login  ||  Method : POST
router.post('/login',[
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password should contain atleast 8 characters').isLength({min:6})
], logincontroller)
 
// test routes.
router.get('/getuser', requireSignIn, iSTeacher, TestController);

// protected User Route Auth..
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ok:true});
})

// protected Teacher Route Auth..
router.get('/teacher-auth', requireSignIn, iSTeacher,  (req, res) => {
    res.status(200).send({ok:true});
})


export default router;