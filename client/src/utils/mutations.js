import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($input: CreateUserInput!) {
        createUser(input: $input) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const CREATE_POST = gql`
    mutation createPost($input: CreatePostInput!) {
        createPost(input: $input)
    }
`;

export const CREATE_COMMENT = gql`
    mutation createComment($postId: ID!, $content: String!) {
        createComment(postId: $postId, content: $content) {
            _id
            title
            content
            createDate
            comments {
                _id
                user {
                    username
                }
                content
            }
        }
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser($userId: ID!, $input: UpdateUserInput!) {
        updateUser(userId: $userId, input: $input) {
            firstName
            lastName
            username
        }
    }
`;

export const UPDATE_POST = gql`
    mutation updatePost($postId: ID!, $userId: ID, $input: UpdatePostInput) {
        updatePost(postId: $postId, userId: $userId, input: $input) {
            _id
            title
            content
            comments {
                _id
                user {
                    _id
                    username
                }
                content
                createdAt
            }
        }
    }
`;

export const UPDATE_COMMENT = gql`
    mutation updateComment($commentId: ID!, $userId: ID, $content: String) {
        updateComment(commentId: $commentId, userId: $userId, content: $content) {
            _id
            content
        }
    }
`;

export const DELETE_USER_BY_ID = gql`
    mutation deleteUserById($userId: ID!) {
        deleteUserById(userId: $userId)
    }
`;

export const DELETE_POST = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

export const DELETE_COMMENT = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            _id
            title
            content
            comments {
                _id
                user {
                    _id
                    username
                }
                content
                createdAt
            }
        }
    }
`;