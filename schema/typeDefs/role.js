const { gql } = require('apollo-server-express');

module.exports = gql `
type Query {
    getRole: Role
}
type Mutation {
    createRole(newRole: RoleInput ):RoleRespone
}
type Role {
    roleName: String,
    note: String
}
input RoleInput {
    roleName: String,
    note: String
}
type RoleRespone {
    success:Boolean
    message:String
}

`