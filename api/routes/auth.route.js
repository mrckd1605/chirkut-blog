import express from 'express'
import { signUp } from '../controllers/auth.contoller.js'

const router = express.Router()

router.post('/sign-up',signUp)

export default router