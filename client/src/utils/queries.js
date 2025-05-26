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
                createDate
            }
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
                createDate
            }
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
                createDate
            }
        }
    }
`;

export const QUERY_POSTS = gql`
    query allPosts {
        posts {
            _id
            user {
                _id
                username
                firstName
                lastName
            }
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
            createDate
        }
    }
`;

export const QUERY_SINGLE_POST = gql`
    query singlePost($postId: ID!) {
        post(postId: $postId) {
            _id
            user {
                _id
            }
            title
            content
            comments {
                _id
                user {
                    _id
                    username
                }
                post {
                    user {
                        _id
                    }
                }
                content
                createdAt
                timeSince
            }
            createDate
        }
    }
`;
