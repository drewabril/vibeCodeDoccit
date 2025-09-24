import { Router } from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from '../controllers/postController';

const router = Router();

// Route to create a new post
router.post('/', createPost);

// Route to get a specific post by ID
router.get('/:id', getPostById);

// Route to update a post by ID
router.put('/:id', updatePost);

// Route to delete a post by ID
router.delete('/:id', deletePost);

// Route to get all posts for a specific subreddit
router.get('/', getPosts);

export default router;