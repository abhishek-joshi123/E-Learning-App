
import {Router} from 'express'
import { iSTeacher, requireSignIn } from '../../Middleware/FetchUser.js'
import { createContentController } from '../../Controllers/Course/ContentController.js'


const router = Router()

//  create a Content... 
router.post('/create-Content/:id', requireSignIn, iSTeacher, createContentController)


export default router