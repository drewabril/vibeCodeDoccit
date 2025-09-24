import { Request, Response } from 'express';
import Post from '../models/Post';

// Create a new post
export const createPost = async (req: Request, res: Response) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (error: any) {
        res.status(400).json({ message: error?.message || 'Failed to create post' });
    }
};

// Get all posts
export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error: any) {
        res.status(500).json({ message: error?.message || 'Failed to fetch posts' });
    }
};

// Get a single post by ID
export const getPostById = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error: any) {
        res.status(500).json({ message: error?.message || 'Failed to fetch post' });
    }
};

// Update a post by ID
export const updatePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error: any) {
        res.status(400).json({ message: error?.message || 'Failed to update post' });
    }
};

// Delete a post by ID
export const deletePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error?.message || 'Failed to delete post' });
    }
};