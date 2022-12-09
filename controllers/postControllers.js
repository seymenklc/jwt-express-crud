import mongoose from 'mongoose';
import Post from '../models/Post.js';

export const getPosts = async (req, res) => {
    try {
        const post = await Post.find();

        res.status(200).json({ success: true, post });

    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
};

export const addPost = async (req, res) => {
    const { author, title, body, year } = req.body;

    try {
        const post = new Post({ author, title, body, year });
        const newPost = await post.save();

        res.status(201).json({ success: true, newPost });

    } catch (error) {
        res.status(409).json({ success: false, error: error.message });
    }
};

export const editPost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({ success: false, error: 'No post with that id' });
        }

        const editedPost = await Post.findByIdAndUpdate(_id, post, { new: true, useFindAndModify: false });

        res.status(200).json({ success: true, editedPost });

    } catch (error) {
        res.status(409).json({ success: false, error: error.message });
    }
};

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({ success: false, error: 'No post with that id' });
        }

        await Post.findByIdAndRemove(_id, { useFindAndModify: false });

        res.status(200).json({ success: true, message: 'Deleted Successfully' });

    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};