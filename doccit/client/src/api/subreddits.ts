import axios from 'axios';

const API_URL = '/api/subreddits';

export const createSubreddit = async (subredditData) => {
    const response = await axios.post(API_URL, subredditData);
    return response.data;
};

export const getSubreddit = async (subredditId) => {
    const response = await axios.get(`${API_URL}/${subredditId}`);
    return response.data;
};

export const deleteSubreddit = async (subredditId) => {
    const response = await axios.delete(`${API_URL}/${subredditId}`);
    return response.data;
};

export const getAllSubreddits = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};