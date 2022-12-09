import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    author: {
        type: String,
        required: [true, 'Provide an author']
    },
    title: {
        type: String,
        required: [true, 'Provide a title']
    },
    body: { type: String },
    year: { type: Number }
});

const Post = mongoose.model('Post', postSchema);

export default Post;
