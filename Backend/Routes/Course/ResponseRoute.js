
import {Router} from 'express'
import { requireSignIn } from '../../Middleware/FetchUser.js'
import { getResponseController } from '../../Controllers/Course/ResponseController.js'


const router = Router()

router.post('/get-response/:id', requireSignIn, getResponseController)

export default router