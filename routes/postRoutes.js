import express from 'express';

import { auth } from '../middleware/auth.js';
import { addPost, getPosts, editPost, deletePost } from '../controllers/postControllers.js';

const router = express.Router();

router.get('/posts', auth, getPosts);
router.post('/posts', auth, addPost);
router.put('/posts/:id', auth, editPost);
router.delete('/posts/:id', auth, deletePost);

export default router;