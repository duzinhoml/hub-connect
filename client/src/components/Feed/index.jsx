import { useState } from "react";
import { useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries.js";
import { DELETE_POST } from "../../utils/mutations.js";

import CreatePost from "./CreatePost.jsx";
import UpdatePost from "./UpdatePost.jsx";
import Comments from "./Comments.jsx";

function Feed({ user, error }) {
    const [currentPost, setCurrentPost] = useState(null);

    const [deletePost] = useMutation(DELETE_POST, {
        refetchQueries: [
            QUERY_ME
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
            {user.posts && user.posts.length ? (
                user.posts.map(post => (
                    <div key={post._id} className="card mb-2 mx-2">
                        <div className="card-header d-flex align-items-center justify-content-between">
                            {post.title}
                            <div>
                                <button 
                                    className="btn me-2"
                                    type="button" 
                                    data-bs-toggle="offcanvas" 
                                    data-bs-target={`#postComments${post._id}`}
                                    onClick={() => setCurrentPost(post)}
                                >
                                    <i class="fa-solid fa-angle-down"></i>
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-warning btn-sm me-2" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#updatePost"
                                    onClick={() => setCurrentPost(post)}
                                >
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeletePost(post._id)}>
                                    <i class="fa-solid fa-trash"></i>
                                </button>
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
                <div className="alert alert-info" role="alert">
                    {'No posts available.'}
                </div>
            )}
            <CreatePost />
            <UpdatePost currentPost={currentPost}/>
            <Comments currentPost={currentPost} />
        </>
    );
};

export default Feed;