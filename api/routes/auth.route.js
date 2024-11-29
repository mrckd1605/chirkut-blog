import express from 'express'
import { signUp } from '../controllers/auth.contoller.js'
import { signIn } from '../controllers/auth.contoller.js'
import { google } from '../controllers/auth.contoller.js'

const router = express.Router()

router.post('/sign-up',signUp)
router.post('/sign-in',signIn)
router.post('/google',google)

export default router