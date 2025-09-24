import React from 'react';
import Comment from './Comment';

interface PostProps {
    title: string;
    content: string;
    comments: Array<{
        id: number;
        author: string;
        content: string;
    }>;
}

const Post: React.FC<PostProps> = ({ title, content, comments }) => {
    return (
        <div className="post">
            <h2>{title}</h2>
            <div className="post-content">{content}</div>
            <div className="comments">
                {comments.map(comment => (
                    <Comment key={comment.id} author={comment.author} content={comment.content} />
                ))}
            </div>
        </div>
    );
};

export default Post;