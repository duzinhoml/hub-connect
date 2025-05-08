import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
    query users {
        users {
            _id
            firstName
            lastName
            username
            posts {
                _id
                title
                content
                comments
                createDate
            }
            comments
        }
    }
`;

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            firstName
            lastName
            username
            posts {
                _id
                title
                content
                comments
                createDate
            }
            comments
        }
    }
`;

export const QUERY_ME = gql`
    query me {
        me {
            _id
            firstName
            lastName
            username
            posts {
                _id
                title
                content
                comments
                createDate
            }
            comments
        }
    }
`;

export const QUERY_POSTS = gql`
    query allPosts {
        posts {
            _id
            title
            content
            comments
            createDate
        }
    }
`;

export const QUERY_SINGLE_POST = gql`
    query singlePost($postId: ID!) {
        post(postId: $postId) {
            _id
            title
            content
            comments
            createDate
        }
    }
`;
