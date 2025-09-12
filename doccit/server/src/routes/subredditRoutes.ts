import { Router } from 'express';
import {
  createSubreddit,
  getSubreddit,
  updateSubreddit,
  deleteSubreddit,
  getAllSubreddits,
} from '../controllers/subredditController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// Route to create a new subreddit
router.post('/', authenticate, createSubreddit);

// Route to get a specific subreddit by ID
router.get('/:id', getSubreddit);

// Route to update a specific subreddit by ID
router.put('/:id', authenticate, updateSubreddit);

// Route to delete a specific subreddit by ID
router.delete('/:id', authenticate, deleteSubreddit);

// Route to get all subreddits
router.get('/', getAllSubreddits);

export default router;