const { gql } = require('apollo-server-express');

module.exports = gql`
    scalar Date
    type Query {
        getUsers:[User]
        getUserLogin: User
        getUserById(id:ID!):User
        getUserPagination(page:Int, limit:Int, keyword:String,  pagination:Boolean):UserPaginator
         
    }
    type Mutation {
        createUser(newUser:UserInput):UserResponse
        updateUser(userId:ID,newUser:UpdateUserInput):UserResponse
        deleteUser(userId:ID):UserResponse
        
        login(email:String,password:String):LoginResponse!
        resetPassword(userId:ID, password:String):UserResponse  
        refreshToken(requestToken:String):UserResponse
        logoutLoginUser(token: String!): UserResponse!
    }
    type User{
        firstName: String
        lastName: String
        userName: String
        email: String
        password: String
        phone: String
        address: String
        role: Role
        dob:Date
        active:Boolean
        profileImage:String
    }
    input UserInput{
        firstName: String
        lastName: String
        userName: String
        email: String
        password: String
        phone: String
        address: String
        role:ID
        dob:Date
        active:Boolean
        profileImage:String
    }
    input UpdateUserInput{
        firstName: String
        lastName: String
        userName: String
        phone: String
        address: String
        role:ID
        dob:Date
        active:Boolean
        profileImage:String
    }
    type UserResponse{
        success:Boolean
        message:String
        token:String
    }
    type LoginResponse{
        user:User
        token:String
        refreshToken:String
    }
    type UserPaginator {
        users: [User!]!
        paginator: Paginator!
    }
    type Paginator {
        slNo: Int
        prev: Int
        next: Int
        perPage: Int
        totalPosts: Int
        totalPages: Int
        currentPage: Int
        hasPrevPage: Boolean
        hasNextPage: Boolean
        totalDocs:Int
    }

`