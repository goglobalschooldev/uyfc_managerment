const Role = require("../model/role")


module.exports = {
    Query: {

    },
    Mutation : {
        createRole:async (_,{newRole},{Role}) => {
            console.log(Role)
           try {
            const role = new Role(newRole)
            const isCreated =  await role.save()
            if (!isCreated) {
                return {
                    success:false,
                    message:" cannot create new role"
                }
            }
            return {
                success:true,
                message:"create role success"
            }
           } catch (error) {
            return {
                success:false,
                message:"Ao"+ error.message
            }
           }
        }
    }
}