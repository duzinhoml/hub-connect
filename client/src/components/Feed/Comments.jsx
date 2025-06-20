import { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_POST } from "../../utils/queries.js";

import { CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT } from "../../utils/mutations.js";

import '../../App.css'
import './index.css';

function Comments({ currentPost, me }) {
    const [formData, setFormData] = useState('')

    const { data: singlePostData } = useQuery(QUERY_SINGLE_POST, {
        variables: {
            postId: currentPost ? currentPost._id : null
        }
    });

    const [createComment] = useMutation(CREATE_COMMENT);
    const [updateComment] = useMutation(UPDATE_COMMENT, {
        refetchQueries: [
            { 
                query: QUERY_SINGLE_POST,
                variables: {
                    postId: currentPost ? currentPost._id : null
                }
            }
        ]
    });
    const [deleteComment] = useMutation(DELETE_COMMENT);

    const handleInputChange = (e) => {
        setFormData(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await createComment({
                variables: {
                    postId: currentPost._id,
                    content: formData
                } 
            });
            setFormData('');
        } 
        catch (err) {
            console.error(err);
        }
    };

    const handleLikeComment = async (commentId, userId) => {
        try {
            await updateComment({
                variables: {
                    commentId,
                    userId
                }
            });
        } 
        catch (err) {
            console.error(err);
        }
    }

    const handleDeleteComment = async (postId, commentId) => {
        try {
            await deleteComment({
                variables: {
                    postId,
                    commentId
                }
            });
        }
        catch (err) {
            console.error(err);
        }
    }

    const singlePost = singlePostData?.post || {};

    return (
        <div className="offcanvas offcanvas-bottom" tabIndex="-1" id={currentPost && `postComments${currentPost._id}`} aria-labelledby="postCommentsLabel" style={{ height: '50vh', backgroundColor: '#d3c2aa' }}>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title mlColor" id="postCommentsLabel" style={{ fontWeight: 600 }}>
                    {currentPost && currentPost.user._id === me._id ? 
                        'Your Post' : currentPost ? 
                        `${currentPost.user.username}'s Post` : 'Comments'}
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body small">
                {singlePost && singlePost?.comments?.length ? (
                    singlePost?.comments.map(comment => (
                        <div key={comment._id} className="card mb-2 mx-2 p-2 border-2" style={{ borderColor: '#533b30' }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex flex-column mlColor">
                                    <div>
                                        {comment.user.username}
                                        <span className="text-muted ms-2">{comment.timeSince}</span>
                                    </div>
                                    <div>{comment.content}</div>

                                    {/* WIP (Comment replies) */}
                                    {/* <div className="collapse" id={`collapseExample${comment._id}`}>
                                        <div className="card card-body">
                                            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger. 
                                        </div>
                                    </div> */}

                                </div>
                                <div>
                                    <span
                                        className="badge me-1"
                                        style={{ backgroundColor: '#533b30' }}
                                    >
                                        {comment.likes?.length} {comment.likes?.length === 1 ? 'like' : 'likes'}
                                    </span>
                                    <button type="button" className="btn btn-sm" onClick={() => handleLikeComment(comment._id, me._id)}>
                                        {comment.likes.some(like => like._id === me._id) ? <i className="fa-solid fa-heart text-danger"></i> : <i className="fa-regular fa-heart"></i>}
                                    </button>

                                    {/* Dropdown */}
                                    {comment.user._id === me._id ? (
                                        <div className="dropdown d-inline-block">
                                            <button className="btn btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="fa-solid fa-gear"></i>
                                            </button>
                                            <ul className="dropdown-menu p-2" style={{ backgroundColor: '#533b30' }}>
                                                {/* WIP (Edit Comment) */}
                                                {/* <li>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-warning btn-sm mb-2 w-100 d-flex justify-content-between align-items-center" 
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#updatePost"
                                                    >
                                                        <span>Edit Comment</span>
                                                        <i className="fa-solid fa-pen-to-square"></i>
                                                    </button>
                                                </li> */}

                                                {/* WIP (Reply to Comment) */}
                                                {/* <li>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-info btn-sm mb-2 w-100 d-flex justify-content-between align-items-center" 
                                                        data-bs-toggle="collapse" 
                                                        data-bs-target={`#collapseExample${comment._id}`} 
                                                        aria-expanded="false" 
                                                        aria-controls="collapseExample"
                                                    >
                                                        <span>Reply</span>
                                                        <i className="fa-solid fa-reply"></i>
                                                    </button>
                                                </li> */}
                                                <li>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-sm w-100 d-flex justify-content-between align-items-center darkColor" 
                                                        onClick={() => handleDeleteComment(currentPost._id, comment._id)}
                                                    >
                                                        <span>Delete Comment</span>
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    ) : singlePost.user._id === me._id ? (
                                        <div className="dropdown d-inline-block">
                                            <button className="btn btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="fa-solid fa-gear"></i>
                                            </button>
                                            <ul className="dropdown-menu p-2" style={{ backgroundColor: '#533b30' }}>
                                                <li>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-sm w-100 d-flex justify-content-between align-items-center darkColor" 
                                                        onClick={() => handleDeleteComment(currentPost._id, comment._id)}
                                                    >
                                                        <span>Delete Comment</span>
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    ) : ''}
                                </div>
                            </div>
                        </div>
                    ))
                ) : 'No comments yet!'}
            </div>

            <form onSubmit={handleFormSubmit}>
                <div className="m-3 d-flex align-items-center">
                    <input 
                        type="text"
                        id="commentInput"
                        className="form-control createCommentInput"
                        value={formData}
                        placeholder="Add a comment..."
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                    <button className="btn ms-2"  style={{ backgroundColor: '#533b30', color: '#d4c3ab' }} disabled={!formData} type="submit">
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </form>

        </div>
    );
};

export default Comments;