import { Schema, model } from 'mongoose';

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        }
    }
);

const Post = model('Post', postSchema);

export default Post;