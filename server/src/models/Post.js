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
        ],
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => {
                const formattedDate = timestamp.toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                  });
                  return formattedDate.replace(/(\d{2}),/, '$1.');
            }
        }
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