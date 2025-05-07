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
    mutation Login($postId: ID!, $input: UpdatePostInput!) {
        updatePost(postId: $postId, input: $input) {
            _id
            title
            content
        }
    }
`;

export const DELETE_USER_BY_ID = gql`
    mutation Login($userId: ID!) {
        deleteUserById(userId: $userId)
    }
`;

export const DELETE_POST = gql`
    mutation Login($postId: ID!) {
        deletePost(postId: $postId)
    }
`;