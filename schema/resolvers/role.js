const Role = require("../model/role")


module.exports = {
    Query: {

    },
    Mutation : {
        createRole: async (__, args) => {
            try {
                const role = await new Role(args.input).save();
                if (role){
                    return {
                        success: true,
                        message: 'Create Role Success!',
                         
                    }
                }
                return {
                        success: false,
                        message: 'can not create Role',
                     
                }
            } catch (error) {
                return {
                    success: false,
                    message: error.message
                    
                }
            }
        },
        deleteRole: async (__, args) => {
            try {
                const findDelete = await Role.findByIdAndDelete( args.roleId).exec();
                if (findDelete){
                    return {
                        message: "Delete Role Success!",
                        success: true
                    }
                }
                return {
                    success: false,
                    message: " can not Delete Role  !"
                    
                }
            } catch (error) {
                return {
                    success: false,
                    message: error.message
                    
                }
            }
        },
        updateRole: async (__, args) => {
            try {
                const findUpdate = await Role.findByIdAndUpdate( args.roleId,args.input).exec();

                if (findUpdate){
                    return {
                        message: "Role Updated!",
                        success: true
                    }
                }
                return {
                    success: false ,
                    message: "  Updated! Role faile"
                    
                }
            } catch (error) {
                return {
                    success: false ,
                    message: error.message
                    
                }
            }
        }
    }
}