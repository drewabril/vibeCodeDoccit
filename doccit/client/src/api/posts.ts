import axios from 'axios';

const API_URL = '/api/posts';

// Function to create a new post
export const createPost = async (postData) => {
    const response = await axios.post(API_URL, postData);
    return response.data;
};

// Function to retrieve all posts
export const getPosts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Function to retrieve a single post by ID
export const getPostById = async (postId) => {
    const response = await axios.get(`${API_URL}/${postId}`);
    return response.data;
};

// Function to update a post by ID
export const updatePost = async (postId, postData) => {
    const response = await axios.put(`${API_URL}/${postId}`, postData);
    return response.data;
};

// Function to delete a post by ID
export const deletePost = async (postId) => {
    const response = await axios.delete(`${API_URL}/${postId}`);
    return response.data;
};