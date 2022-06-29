const { gql } = require('apollo-server-express');

module.exports = gql`
    scalar Date
    type Query {
        getRole:[Role]
        getRolePaginator (page:Int, limit:Int,keyword:String,pagination:String): RolePaginator
    }
    type Mutation {
        createRole(newRole:RoleInput):RoleResponse
        updateRole(roleId:String,newRole:RoleInput):RoleResponse
        deleteRole(roleId:String):RoleResponse
    }
    type Role{
        _id:ID
        roleName: String
        note: String
    }
    input RoleInput{
        roleName: String
        note: String
    }
    type RoleResponse{
        success:Boolean
        message:String
    }
    type RolePaginator {
        role:[Role]
        paginator:Paginator!
    }
`