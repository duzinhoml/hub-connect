import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME, QUERY_POSTS } from "../../utils/queries.js";
import { UPDATE_POST, DELETE_POST } from "../../utils/mutations.js";

import CreatePost from "./CreatePost.jsx";
import UpdatePost from "./UpdatePost.jsx";
import Comments from "./Comments.jsx";

function Feed({ me, users, error }) {
    const [currentPost, setCurrentPost] = useState(null);

    const { data: postsData } = useQuery(QUERY_POSTS);

    const posts = postsData?.posts || [];

    const [updatePost] = useMutation(UPDATE_POST, {
        refetchQueries: [
            QUERY_POSTS
        ]
    });

    const handleLikePost = async (postId, userId) => {
        try {
            await updatePost({
                variables: {
                    postId,
                    userId
                }
            });
        } 
        catch (err) {
            console.error(err);
        }
    }

    const [deletePost] = useMutation(DELETE_POST, {
        refetchQueries: [
            QUERY_ME,
            QUERY_POSTS
        ]
    });

    const handleDeletePost = async (postId) => {
        try {
            await deletePost({
                variables: { 
                    postId
                }
            });
        } 
        catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            {error && <div className="alert alert-danger" role="alert">{error.message}</div>}
            {posts.length ? (
                posts.map(post => (
                    <div 
                            key={post._id} 
                            className="card mb-2 mx-2" 
                            onMouseOver={() => setCurrentPost(post)}
                        >
                            <div className="card-header d-flex align-items-center justify-content-between row">
                                <div className="d-flex flex-column col">
                                    <div>{post.user.firstName} {post.user.lastName}</div>
                                    <div>{post.title}</div>
                                </div>
                                <div className="col text-center">{post.createDate}</div>
                                <div className="col text-end">
                                    <span
                                        className="badge bg-secondary me-1"
                                    >
                                        {post.likes.length} likes
                                    </span>
                                    <button
                                        className="btn px-2 py-1"
                                        type="button"
                                        onClick={() => handleLikePost(post._id, me._id)}
                                    >
                                        {post.likes.some(like => like._id === me._id) ? <i class="fa-solid fa-heart"></i> : <i class="fa-regular fa-heart"></i>}
                                    </button>
                                    <button 
                                        className="btn me-2 px-2 py-1"
                                        type="button" 
                                        data-bs-toggle="offcanvas" 
                                        data-bs-target={`#postComments${post._id}`}
                                    >
                                        <i class="fa-regular fa-comment"></i>
                                    </button>
                                    {post.user._id === me._id ? (
                                        <>
                                            <button 
                                                type="button" 
                                                className="btn btn-warning btn-sm me-2" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#updatePost"
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeletePost(post._id)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </>
                                    ) : ''}
                                </div>
                            </div>
                            <div className="card-body text-start">
                                <p className="card-text">
                                    {post.content}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-secondary" role="alert">
                        {'No posts available.'}
                    </div>
                )}
            <CreatePost />
            <UpdatePost currentPost={currentPost}/>
            <Comments currentPost={currentPost} me={me} users={users} />
        </>
    );
};

export default Feed;