import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { CREATE_COMMENT } from "../../utils/mutations.js";
import { DELETE_COMMENT } from "../../utils/mutations.js";

function Comments({ currentPost }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState('')
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

    const handleFormSubmit = async () => {
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
            window.location.reload();
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div class="offcanvas offcanvas-bottom" tabindex="-1" id={currentPost && `postComments${currentPost._id}`} aria-labelledby="postCommentsLabel" style={{ height: '50vh' }}>
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="postCommentsLabel">Offcanvas bottom</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body small">
                {currentPost && currentPost.comments.length ? (
                    currentPost.comments.map((comment, index) => (
                        <div key={index} className="card mb-2 mx-2 p-2">
                            <div className="d-flex justify-content-between align-items-center">
                                {comment}   
                                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeleteComment(currentPost._id, comment)}>
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))
                ) : ''}
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
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </form>

        </div>
    );
};

export default Comments;