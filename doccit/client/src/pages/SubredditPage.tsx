import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSubreddit, fetchPosts } from '../api/subreddits';
import Post from '../components/Post';
import Sidebar from '../components/layout/Sidebar';

const SubredditPage = () => {
    const { subredditName } = useParams();
    const [subreddit, setSubreddit] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getSubredditData = async () => {
            try {
                const subredditData = await fetchSubreddit(subredditName);
                const postsData = await fetchPosts(subredditName);
                setSubreddit(subredditData);
                setPosts(postsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getSubredditData();
    }, [subredditName]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="subreddit-page">
            <Sidebar subreddit={subreddit} />
            <div className="posts-container">
                <h1>{subreddit.title}</h1>
                {posts.map(post => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default SubredditPage;