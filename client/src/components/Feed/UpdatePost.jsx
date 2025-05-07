import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries.js';
import { UPDATE_POST } from '../../utils/mutations.js';

function UpdatePost({ currentPost }) {
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });

    const [updatePost] = useMutation(UPDATE_POST, {
        refetchQueries: [
            QUERY_ME
        ]
    });

    useEffect(() => {
        if (currentPost) {
            setFormData({
                title: currentPost.title,
                content: currentPost.content
            });
        };
    }, [currentPost]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await updatePost({
                variables: {
                    postId: currentPost._id,
                    input: {
                        title: formData.title,
                        content: formData.content
                    }
                }
            });

            setFormData({
                title: '',
                content: ''
            });
        } 
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div class="modal fade" id="updatePost" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="updatePostLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="updatePostLabel">Update Post</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        <div class="modal-body">
                            <input 
                                type="text" 
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Title"
                                className="form-control mb-2"
                            />
                            <textarea 
                                rows={4}
                                type="text" 
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                placeholder="Content"
                                className="form-control mb-2"
                            />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdatePost;