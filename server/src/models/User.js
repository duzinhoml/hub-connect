import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

const User = model('User', userSchema);

export default User;