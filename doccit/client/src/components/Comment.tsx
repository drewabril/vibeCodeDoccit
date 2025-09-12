import React from 'react';

interface CommentProps {
    author: string;
    content: string;
    timestamp: string;
}

const Comment: React.FC<CommentProps> = ({ author, content, timestamp }) => {
    return (
        <div className="comment">
            <div className="comment-header">
                <span className="comment-author">{author}</span>
                <span className="comment-timestamp">{timestamp}</span>
            </div>
            <div className="comment-content">
                {content}
            </div>
        </div>
    );
};

export default Comment;