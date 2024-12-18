import express from 'express'
import { test,updateUser } from '../controllers/user.controller.js';
const router = express.Router()
import {verifyToken} from '../utils/verifyUser.js';

router.get('/test',test)
router.put('/update/:userId',verifyToken,updateUser)

export default router;