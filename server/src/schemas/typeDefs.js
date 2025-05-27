const typeDefs = `
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        username: String!
        posts: [Post]
        comments: [String]
    }

    type Post {
        _id: ID!
        user: User
        title: String!
        content: String!
        likes: [User]
        comments: [Comment]
        createdAt: String
        createDate: String
    }

    type Comment {
        _id: ID!
        user: User
        post: Post
        content: String!
        likes: [User]
        createdAt: String
        createDate: String
        timeSince: String
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
        comments: [Comment]
    }

    type Mutation {
        createUser(input: CreateUserInput!): Auth
        login(username: String!, password: String!): Auth
        createPost(input: CreatePostInput!): String
        createComment(postId: ID!, content: String!): Post

        updateUser(userId: ID!, input: UpdateUserInput!): User
        updatePost(postId: ID!, userId: ID, input: UpdatePostInput): Post
        updateComment(commentId: ID!, userId: ID, content: String): Comment

        deleteUserById(userId: ID!): String
        deletePost(postId: ID!): String
        deleteComment(postId: ID!, commentId: ID!): Post
    }
`;

export default typeDefs;