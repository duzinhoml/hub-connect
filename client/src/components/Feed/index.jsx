import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries.js";
import { UPDATE_POST, DELETE_POST } from "../../utils/mutations.js";

import CreatePost from "./CreatePost.jsx";
import UpdatePost from "./UpdatePost.jsx";
import Comments from "./Comments.jsx";

function Feed({ me, error }) {
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
                            className="card mb-2 mx-2 border-2 rounded-0" 
                            style={{ borderColor: '#533b30'}}
                            onMouseOver={() => setCurrentPost(post)}
                        >
                            <div 
                                className="card-header align-items-center row mlColor border-2 rounded-0 m-0 px-0" 
                                style={{ backgroundColor: '#d3c2aa'}}
                            >
                                <div className="col">
                                    <div>{post.user.firstName} {post.user.lastName}</div>
                                </div>
                                {/* <div className="col text-center">{post.createDate}</div> */}
                                <div className="col text-center">{post.title}</div>
                                <div className="col text-end">
                                    <span
                                        className="badge me-1"
                                        style={{ backgroundColor: '#533b30' }}
                                    >
                                        {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
                                    </span>
                                    <button
                                        className="btn px-2 py-1"
                                        type="button"
                                        onClick={() => handleLikePost(post._id, me._id)}
                                    >
                                        {post.likes.some(like => like._id === me._id) ? <i class="fa-solid fa-heart text-danger"></i> : <i class="fa-regular fa-heart"></i>}
                                    </button>
                                    <button 
                                        className="btn px-2 py-1"
                                        type="button" 
                                        data-bs-toggle="offcanvas" 
                                        data-bs-target={`#postComments${post._id}`}
                                    >
                                        <i class="fa-regular fa-comment"></i>
                                    </button>

                                    {/* Dropdown */}
                                    {post.user._id === me._id ? (
                                        <div class="dropdown d-inline-block">
                                            <button class="btn btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-solid fa-gear"></i>
                                            </button>
                                            <ul class="dropdown-menu p-2">
                                                <li>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-warning btn-sm mb-2 w-100 d-flex justify-content-between align-items-center" 
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#updatePost"
                                                    >
                                                        <span>Edit Post</span>
                                                        <i className="fa-solid fa-pen-to-square"></i>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-danger btn-sm w-100 d-flex justify-content-between align-items-center" 
                                                        onClick={() => handleDeletePost(post._id)}
                                                    >
                                                        <span>Delete Post</span>
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    ) : ''}
                                </div>
                            </div>
                            <div className="card-body text-start mlColor">
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
            <Comments currentPost={currentPost} me={me} />
        </>
    );
};

export default Feed;