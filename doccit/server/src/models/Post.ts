import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    subreddit: {
        type: Schema.Types.ObjectId,
        ref: 'Subreddit',
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    flair: {
        type: String,
        enum: ['Documentation', 'Discussion', 'Question', 'Other'],
        default: 'Other',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
});

const Post = model('Post', postSchema);

export default Post;