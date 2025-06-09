import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";
import { CREATE_POST } from "../../utils/mutations.js";

import '../../App.css';
import './index.css'

function CreatePost() {
    const textareaRef = useRef(null);
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    })

    const [createPost] = useMutation(CREATE_POST, {
        refetchQueries: [
            QUERY_POSTS
        ]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await createPost({
                variables: {
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

    const clearForm = () => {
        setFormData({
            title: '',
            content: ''
        });
    };

    return (
        <>
            <div className="modal fade" id="createPost" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="createPostLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: '#533b30', color: '#d3c2aa' }}>
                        <div className="modal-header" style={{ borderColor: '#d3c2aa' }}>
                            <h1 className="modal-title fs-5" id="createPostLabel">Create New Post</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => clearForm()}></button>
                        </div>

                        <form onSubmit={handleFormSubmit}>
                            <div className="modal-body">
                                    <input 
                                        type="text" 
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Title"
                                        className="form-control mb-2 postInput"
                                    />
                                    <textarea 
                                        ref={textareaRef}
                                        rows={5}
                                        type="text" 
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        placeholder="Content"
                                        className="form-control mb-2 postInput"
                                    />
                            </div>
                            <div className="modal-footer" style={{ borderColor: '#d3c2aa' }}>
                                <button type="button" className="btn darkColor" data-bs-dismiss="modal" onClick={() => clearForm()}>Cancel</button>
                                <button type="submit" className="btn darkColor" disabled={!formData.title || !formData.content} data-bs-dismiss="modal">Post</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default CreatePost;