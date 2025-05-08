import { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries.js";
import { QUERY_SINGLE_POST } from "../../utils/queries.js";

import { CREATE_COMMENT } from "../../utils/mutations.js";
import { DELETE_COMMENT } from "../../utils/mutations.js";

function Comments({ currentPost, me, users }) {
    const [formData, setFormData] = useState('')

    const { loading, data } = useQuery(QUERY_SINGLE_POST, {
        variables: { postId: currentPost?._id}
    });

    const [createComment] = useMutation(CREATE_COMMENT, {
        refetchQueries: [
            QUERY_ME
        ]
    });

    const [deleteComment] = useMutation(DELETE_COMMENT, {
        refetchQueries: [
            QUERY_ME
        ]
    });

    const handleInputChange = (e) => {
        setFormData(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await createComment({
                variables: {
                    postId: currentPost._id,
                    comment: formData
                } 
            });
            setFormData('');
        } 
        catch (err) {
            console.error(err);
        }
    }

    const handleDeleteComment = async (postId, comment) => {
        try {
            await deleteComment({
                variables: {
                    postId,
                    comment
                }
            });
        }
        catch (err) {
            console.error(err);
        }
    }

    const comments = data?.post?.comments || [];

    return (
        <div className="offcanvas offcanvas-bottom" tabIndex="-1" id={currentPost && `postComments${currentPost._id}`} aria-labelledby="postCommentsLabel" style={{ height: '50vh' }}>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="postCommentsLabel">
                    {users?.map(user => user.posts.some(post => post._id === currentPost?._id) ? `${user.username}'s Post` : '')}
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body small">
                {comments.length ? (
                    comments.map((comment, index) => (
                        <div key={index} className="card mb-2 mx-2 p-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex flex-column">
                                    <div>
                                        {users.map(user => user.comments.includes(comment) ? user.username : '')}
                                        <span className="text-muted ms-2">1min</span>
                                    </div>
                                    <div>{comment}</div>
                                </div>
                                {me.posts.some(mePost => mePost._id === currentPost._id) ? (
                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeleteComment(currentPost._id, comment)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                ) : me.comments.some(meComment => meComment === comment) ? (
                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeleteComment(currentPost._id, comment)}>
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
                    <button className="btn btn-primary ms-1" type="submit">
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </form>

        </div>
    );
};

export default Comments;