const typeDefs = `
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        username: String!
        posts: [Post]
    }

    type Post {
        _id: ID!
        title: String!
        content: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    input CreateUserInput {
        firstName: String!
        lastName: String!
        username: String!
        password: String!
    }

    input CreatePostInput {
        title: String!
        content: String!
    }

    input UpdateUserInput {
        username: String
        password: String
    }

    input UpdatePostInput {
        title: String
        content: String
    }

    type Query {
        users: [User]
        user(username: String!): User
        me: User
        posts: [Post]
        post(postId: ID!): Post
    }

    type Mutation {
        createUser(input: CreateUserInput!): Auth
        login(username: String!, password: String!): Auth
        createPost(input: CreatePostInput!): String

        updateUser(userId: ID!, input: UpdateUserInput!): User
        updatePost(postId: ID!, input: UpdatePostInput!): Post

        deleteUserById(userId: ID!): String
        deletePost(postId: ID!): String
    }
`;

export default typeDefs;