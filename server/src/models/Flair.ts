import { Schema, model } from 'mongoose';

const flairSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
    },
    color: {
        type: String,
        required: false,
    },
}, { timestamps: true });

const Flair = model('Flair', flairSchema);

export default Flair;