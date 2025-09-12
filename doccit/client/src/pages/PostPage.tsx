import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../api/posts';
import Post from '../components/Post';
import Comment from '../components/Comment';

const PostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            const fetchedPost = await getPostById(postId);
            setPost(fetchedPost);
            setComments(fetchedPost.comments || []);
        };

        fetchPost();
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Post post={post} />
            <div>
                <h3>Comments</h3>
                {comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
};

export default PostPage;