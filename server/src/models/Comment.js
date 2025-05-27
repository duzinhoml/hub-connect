import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
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

commentSchema.virtual('createDate').get(function() {
    const createdAt = new Date(this.createdAt);
    
    const day = createdAt.getDate().toString().padStart(2, '0');
    const month = createdAt.toLocaleString('en-US', { month: 'short' });
    const year = createdAt.getFullYear();
    let hours = createdAt.getHours();
    const minutes = createdAt.getMinutes().toString().padStart(2, '0');
    const seconds = createdAt.getSeconds().toString().padStart(2, '0');

    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${month} ${day}, ${year} at ${hours}:${minutes}:${seconds} ${period}`;
});

commentSchema.virtual('timeSince').get(function() {
    const now = new Date();
    const createdAt = new Date(this.createdAt);

    const diffInSeconds = Math.floor((now - createdAt) / 1000);
    if (diffInSeconds < 60) {
        return `${diffInSeconds + 1}s`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes}min`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours}h`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays}d`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w`;
});

const Comment = model('Comment', commentSchema);

export default Comment;