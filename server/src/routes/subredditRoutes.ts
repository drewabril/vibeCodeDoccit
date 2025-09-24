import { Router } from 'express';
import {
  createSubreddit,
  getSubredditById,
  updateSubreddit,
  deleteSubreddit,
  getAllSubreddits,
} from '../controllers/subredditController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

// Route to create a new subreddit
router.post('/', authMiddleware, createSubreddit);

// Route to get a specific subreddit by ID
router.get('/:id', getSubredditById);

// Route to update a specific subreddit by ID
router.put('/:id', authMiddleware, updateSubreddit);

// Route to delete a specific subreddit by ID
router.delete('/:id', authMiddleware, deleteSubreddit);

// Route to get all subreddits
router.get('/', getAllSubreddits);

export default router;