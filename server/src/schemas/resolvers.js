import { User, Post, Comment } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({}).populate({
                path: 'posts',
                options: {
                    sort: { createdAt: -1 }
                }
            });
        },
        user: async (_, { username }) => {
            const user = await User.findOne({ username }).populate('posts');
            if (!user) {
                return 'User not found';
            }

            return user;
        },
        me: async (_, _args, context) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id }).populate('posts');
                return user;
            }
            throw new AuthenticationError('Not Authenticated');
        },
        posts: async () => {
            return await Post.find({})
            .populate([
                { path: 'user' },
                { path: 'likes' },
                {
                    path: 'comments',
                    options: {
                        sort: { createdAt: -1 }
                    },
                    populate: [
                        { path: 'user' },
                        { path: 'likes' }
                    ]
                }
            ])
            .sort({ createdAt: -1 });
        },
        post: async (_, { postId }) => {
            const post = await Post.findOne({ _id: postId })
            .populate([
                { path: 'user' },
                { path: 'likes' },
                {
                    path: 'comments',
                    options: {
                        sort: { createdAt: -1 }
                    },
                    populate: [
                        { path: 'user' },
                        { path: 'likes' }
                    ]
                }
            ]);

            if (!post) {
                throw new Error("Post not found");
            }
            return post;
        },
        comments: async () => {
            return await Comment.find({});
        }
    },
    Mutation: {
        createUser: async (_, { input }) => {
            try {
                input.username = input.username.trim()
                input.password = input.password.trim()

                // Username
                const userUsername = await User.findOne({ username: input.username });
                if (userUsername) {
                    throw new Error('Username already exists');
                }

                const user = await User.create({ ...input });
                const token = signToken(user._id, user.username);
                return { token, user };
            } 
            catch (err) {
                throw new Error(`${err.message}`);
            }
        },
        login: async (_, { username, password }) => {
            const user = await User.findOne({ username }).populate('posts');
            if (!user) {
                throw new AuthenticationError('User not found. Please check your username or create a new account.');
            }

            const correctPW = await user.isCorrectPassword(password);
            if (!correctPW) {
                throw new AuthenticationError('Incorrect username or password. Please try again.');
            }

            const token = signToken(user._id, user.username);
            return { token, user };
        },
        createPost: async (_, { input }, context) => {
            try {
                if (context.user) {
                    const { title, content } = input;
                    const post = await Post.create({ user: context.user._id, title, content });

                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: {
                            posts: post._id 
                        }},
                        { new: true}
                    );

                    if (!updatedUser) {
                        throw new Error('User not found or update failed');
                    }

                    return `Post "${post.title}" created successfully!`;
                };
                throw new AuthenticationError('You need to be logged in!');
            } 
            catch (err) {
                throw new Error('Failed to created post');
            }
        },
        createComment: async (_, { postId, content }, context) => {
            try {
                if (!context.user) {
                    throw new AuthenticationError('You need to be logged in!');
                }

                const post = await Post.findOne({ _id: postId });
                if (!post) {
                    throw new Error('Post not found');
                }

                const comment = await Comment.create({
                    user: context.user._id,
                    post: postId,
                    content: content
                 });

                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    { $push: {
                        comments: comment._id
                    }},
                    { new: true }
                );

                // await User.findOneAndUpdate(
                //     { _id: context.user._id },
                //     { $push: {
                //         comments: comment
                //     }},
                //     { new: true }
                // );

                return updatedPost.populate({
                    path: 'comments',
                    populate: [
                        { path: 'user'},
                        { path: 'post' }
                    ]
                });
            } 
            catch (err) {
                throw new Error('Failed to create comment');
            }
        },
        updateUser: async (_, { userId, input }, context) => {
            try {
                if (!context.user) {
                    throw new AuthenticationError('You need to be logged in!');
                }

                const user = await User.findOneAndUpdate(
                    { _id: userId },
                    { $set: input },
                    { new: true }
                ).populate('posts');

                if (!user) {
                    throw new Error('User not found or update failed');
                }

                return user;
            } 
            catch (err) {
                throw new Error(`Failed to update user: ${err.message}`);
            }
        },
        updatePost: async (_, { postId, userId, input }, context) => {
            try {
                if (!context.user) {
                    throw new Error('Not authenticated');
                }

                if (!userId) {
                    const post = await Post.findOneAndUpdate(
                        { _id: postId },
                        { $set: input },
                        { new: true }
                    );
                    if (!post) {
                        throw new Error('Post not found or update failed');
                    }
    
                    return post.populate([
                        {
                            path: 'likes'
                        },
                        {
                            path: 'comments',
                            populate: 'user'
                        }
                    ]);
                }

                const post = await Post.findOne({ _id: postId });
                if (!post) {
                    throw new Error('Post not found or update failed');
                }

                if (!post.likes.includes(userId)) {
                    const updatedPost = await Post.findOneAndUpdate(
                        { _id: postId },
                        { $addToSet: {
                            likes: userId
                        }},
                        { new: true}
                    );


                    return updatedPost.populate([
                        {
                            path: 'likes'
                        },
                        {
                            path: 'comments',
                            populate: 'user'
                        }
                    ]);
                }

                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    { $pull: {
                        likes: userId
                    }},
                    { new: true }
                );

                return updatedPost.populate([
                    {
                        path: 'likes'
                    },
                    {
                        path: 'comments',
                        populate: 'user'
                    }
                ]);
            } 
            catch (err) {
                return `Failed to update post: ${err.message}`;
            }
        },
        updateComment: async (_, { commentId, userId, content }, context) => {
            try {
                if (!context.user) {
                    throw new Error('Not authenticated');
                }

                if (!userId) {
                    const updatedComment = await Comment.findOneAndUpdate(
                        { _id: commentId },
                        { $set: content },
                        { new: true }
                    );

                    if (!updatedComment) {
                        throw new Error('Comment not found or update failed');
                    }

                    return updatedComment;
                }

                const comment = await Comment.findOne({ _id: commentId });
                if (!comment) {
                    throw new Error('Comment not found or update failed');
                }

                if (!comment.likes.includes(userId)) {
                    const updatedComment = await Comment.findOneAndUpdate(
                        { _id: commentId },
                        { $addToSet: {
                            likes: userId
                        }},
                        { new: true }
                    );

                    return updatedComment;
                }

                const updatedComment = await Comment.findOneAndUpdate(
                    { _id: commentId },
                    { $pull: {
                        likes: userId
                    }},
                    { new: true}
                );

                return updatedComment;
            } 
            catch (err) {
                return `Failed to update comment: ${err.message}`;
            }
        },
        deleteUserById: async (_, { userId }) => {
            try {
                const user = await User.findOne({ _id: userId }).populate('posts');
                if (!user) {
                    throw new Error('User not found');
                }

                await Post.deleteMany({ 
                    _id: {
                        $in: user.posts.map(post => post._id)
                    }
                });

                await Post.updateMany(
                    {},
                    { $pull: {
                        comments: {
                            $in: user.comments
                        }
                    }}
                );

                await User.findOneAndDelete({ _id: userId });
                return `${user.firstName} ${user.lastName}, your account and associated posts/comments have been deleted successfully`;
            } 
            catch (err) {
                throw new Error(`Failed to delete user: ${err.message}`);
            }
        },
        deletePost: async (_, { postId }, context) => {
            try {
                if (!context.user) {
                    throw new AuthenticationError('You need to be logged in!');
                }

                const post = await Post.findOne({ _id: postId });
                if (!post) {
                    throw new Error('Post not found');
                }

                await User.updateMany(
                    {},
                    { $pull: {
                        comments: {
                            $in: post.comments
                        }
                    }}
                );

                await Comment.deleteMany({
                    _id: {
                        $in: post.comments
                    }
                });

                await Post.findOneAndDelete({ _id: postId });
                return `The post "${post.title}" has been deleted successfully`;
            } 
            catch (err) {
                return `Failed to delete note: ${err.message}`;
            }
        },
        deleteComment: async (_, { postId, commentId }, context) => {
            try {
                if (!context.user) {
                    throw new AuthenticationError('You need to be logged in!');
                }

                const post = await Post.findOne({ _id: postId });
                if (!post) {
                    throw new Error('Post not found');
                }

                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    { $pull: {
                        comments: commentId
                    }},
                    { new: true }
                );

                await Comment.findOneAndDelete({ _id: commentId });

                // await User.findOneAndUpdate(
                //     { _id: context.user._id },
                //     { $pull: {
                //         comments: comment
                //     }},
                //     { new: true }
                // );

                return updatedPost.populate({
                    path: 'comments',
                    options: {
                        sort: { createdAt: -1 }
                    },
                    populate: 'user'
                });
            } 
            catch (err) {
                return `Failed to delete comment: ${err.message}`;
            }
        }
    }
};

export default resolvers;