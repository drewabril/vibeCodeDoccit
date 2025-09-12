import { Schema, model } from 'mongoose';

const subredditSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    flair: [{
        type: Schema.Types.ObjectId,
        ref: 'Flair'
    }],
    sidebarContent: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Subreddit = model('Subreddit', subredditSchema);

export default Subreddit;