import { Schema, model } from 'mongoose';

const postSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
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
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
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
    let hours = createdAt.getHours();
    const minutes = createdAt.getMinutes().toString().padStart(2, '0');

    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${month} ${day}, ${year} at ${hours}:${minutes} ${period}`;
});

// postSchema.virtual('commentCreateDate').get(function() {
//     const createdAt = new Date(this)
// })

const Post = model('Post', postSchema);

export default Post;