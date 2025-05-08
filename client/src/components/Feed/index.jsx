import { useState } from "react";
import { useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries.js";
import { DELETE_POST } from "../../utils/mutations.js";

import CreatePost from "./CreatePost.jsx";
import UpdatePost from "./UpdatePost.jsx";
import Comments from "./Comments.jsx";

function Feed({ me, users, error }) {
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
            {users?.some(user => user.posts.length) ? (
                users.map(user => 
                    user.posts.map(post => (
                        <div 
                            key={post._id} 
                            className="card mb-2 mx-2" 
                            onMouseOver={() => setCurrentPost(post)}
                        >
                            <div className="card-header d-flex align-items-center justify-content-between row">
                                <div className="d-flex flex-column col">
                                    <div>{user.firstName} {user.lastName}</div>
                                    <div>{post.title}</div>
                                </div>
                                <div className="col text-center">{post.createDate}</div>
                                <div className="col text-end">
                                    <button 
                                        className="btn me-2"
                                        type="button" 
                                        data-bs-toggle="offcanvas" 
                                        data-bs-target={`#postComments${post._id}`}
                                    >
                                        <i className="fa-solid fa-angle-down"></i>
                                    </button>
                                    {me.posts.some(mePost => mePost._id === post._id) ? (
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
                )) : (
                    <div className="alert alert-info" role="alert">
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