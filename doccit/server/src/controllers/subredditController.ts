import { Request, Response } from 'express';
import Subreddit from '../models/Subreddit';

// Create a new subreddit
export const createSubreddit = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    try {
        const newSubreddit = new Subreddit({ name, description });
        await newSubreddit.save();
        res.status(201).json(newSubreddit);
    } catch (error) {
        res.status(500).json({ message: 'Error creating subreddit', error });
    }
};

// Get all subreddits
export const getAllSubreddits = async (req: Request, res: Response) => {
    try {
        const subreddits = await Subreddit.find();
        res.status(200).json(subreddits);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subreddits', error });
    }
};

// Get a subreddit by ID
export const getSubredditById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const subreddit = await Subreddit.findById(id);
        if (!subreddit) {
            return res.status(404).json({ message: 'Subreddit not found' });
        }
        res.status(200).json(subreddit);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subreddit', error });
    }
};

// Update a subreddit by ID
export const updateSubreddit = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedSubreddit = await Subreddit.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!updatedSubreddit) {
            return res.status(404).json({ message: 'Subreddit not found' });
        }
        res.status(200).json(updatedSubreddit);
    } catch (error) {
        res.status(500).json({ message: 'Error updating subreddit', error });
    }
};

// Delete a subreddit by ID
export const deleteSubreddit = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedSubreddit = await Subreddit.findByIdAndDelete(id);
        if (!deletedSubreddit) {
            return res.status(404).json({ message: 'Subreddit not found' });
        }
        res.status(200).json({ message: 'Subreddit deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting subreddit', error });
    }
};