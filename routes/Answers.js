import express  from "express";

import { postAnswer , deleteAnswer } from '../controllers/Answers.js'
import auth from '../middleware/auth.js'

const router = express.Router();

//we are using patch request because it is used to update or append a perticular existing database collection.

router.patch('/post/:id', auth, postAnswer)
router.patch('/delete/:id',auth,  deleteAnswer )

export default router