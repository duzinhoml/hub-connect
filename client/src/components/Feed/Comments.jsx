import { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_POST } from "../../utils/queries.js";

import { CREATE_COMMENT } from "../../utils/mutations.js";
import { DELETE_COMMENT } from "../../utils/mutations.js";

function Comments({ currentPost, me, users }) {
    const [formData, setFormData] = useState('')

    const { data: singlePostData } = useQuery(QUERY_SINGLE_POST, {
        variables: {
            postId: currentPost ? currentPost._id : null
        }
    });

    const [createComment] = useMutation(CREATE_COMMENT);

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
        <div className="offcanvas offcanvas-bottom" tabIndex="-1" id={currentPost && `postComments${currentPost._id}`} aria-labelledby="postCommentsLabel" style={{ height: '50vh' }}>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="postCommentsLabel">
                    {currentPost ? `${currentPost.user.username}'s Post` : 'Comments'}
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body small">
                {singlePost && singlePost?.comments?.length ? (
                    singlePost?.comments.map(comment => (
                        <div key={comment._id} className="card mb-2 mx-2 p-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex flex-column">
                                    <div>
                                        {comment.user.username}
                                        <span className="text-muted ms-2">{comment.timeSince}</span>
                                    </div>
                                    <div>{comment.content}</div>
                                </div>
                                {comment.user._id === me._id ? (
                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeleteComment(currentPost._id, comment._id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                ) : singlePost.user._id === me._id ? (
                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeleteComment(currentPost._id, comment._id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                ) : ''}
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
                        className="form-control"
                        value={formData}
                        placeholder="Add a comment..."
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                    <button className="btn btn-primary ms-2" type="submit">
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </form>

        </div>
    );
};

export default Comments;