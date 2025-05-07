import { useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries.js";
import { DELETE_POST } from "../../utils/mutations.js";

import CreatePost from "./CreatePost.jsx";

function Feed({ user, error }) {
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
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeletePost(post._id)}>
                                <i class="fa-solid fa-trash"></i>
                            </button>
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
        </>
    );
};

export default Feed;