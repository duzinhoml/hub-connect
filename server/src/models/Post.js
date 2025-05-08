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
        },
        comments: [
            {
                type: String,
                trim: true
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
        timestamps: true
    }
);

postSchema.virtual('createDate').get(function() {
    const createdAt = new Date(this.createdAt);
    
    const day = createdAt.getDate().toString().padStart(2, '0');
    const month = createdAt.toLocaleString('en-US', { month: 'short' });
    const year = createdAt.getFullYear();

    return `${month} ${day}, ${year}`;
});

// postSchema.virtual('commentCreateDate').get(function() {
//     const createdAt = new Date(this)
// })

const Post = model('Post', postSchema);

export default Post;