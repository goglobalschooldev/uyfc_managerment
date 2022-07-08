const { auth } = require("../../config/firebaseconfig")
const UserSchema = require('../model/user');
const Mongoose = require('mongoose');
const { authCheck } = require("../../helpers/auth");
 

const userLabel = {
  docs: "users",
  limit: "perPage",
  nextPage: "next",
  prevPage: "prev",
  meta: "paginator",
  page: "currentPage",
  pagingCounter: "slNo",
  totalDocs: "totalDocs",
  totalPages: "totalPages",
};
module.exports = {

  Query: {
    getUsers: async (_, { } ) => {
      try {
        const users = await UserSchema.find({}) //.populate('role');
        return users;
      } catch (error) {
        return {
          success: false,
          message: "An error occured" + error.message
        }
      }
    },
    getUserById: async (_, { id } ) => {
      try {
        const user = await UserSchema.findById(id);
        if (!user) {
          return {
            success: false,
            message: "មិនមានអ្នកប្រើប្រាស់នៅក្នុងប្រព័ន្ធទេ"
          }
        }
        return user;
      } catch (error) {
        return {
          success: false,
          message: "An error occured" + error.message
        }
      }
    },
    getUserPagination: async (_, { page, limit, keyword, pagination }) => {

      const options = {
        page: page || 1,
        limit: limit || 10,
        pagination: pagination,
        customLabels: userLabel,
        sort: {
          createdAt: -1,
        },
        populate: "",
      }

      const query = {
        // $or: [
        //     { 
        //       userName: { $regex: keyword, $options: "i" } 
        //     },
        //  ],
      }

      const users = await UserSchema.paginate(query, options);
      return users;
    },
    getUserLogin: async (_,{},{req}) => {
     // console.log ("req",req)

      const currentUser = await authCheck(req)
    //console.log("currentUser",currentUser)
    const user = await UserSchema.findById(currentUser.uid)
    return user
     
       
    }
  },
  Mutation: {
    logoutLoginUser: async (__, args, { req }) => {
      const currentUser =   authCheck(req);
      if (!currentUser) {
        return {
          success: false,
          message: "No user"
        }
      }
      try {
        return {
          message: "Logout User Success!",
          status: true,
          data: null,
        };
      } catch (error) {
        return {
          message: error.message,
          status: false,
          data: null,
        };
      }
    },
    createUser: async (_, { newUser }) => {
      try {
        const uuid = Mongoose.Types.ObjectId()
        const user = await UserSchema({
          ...newUser,
          _id: uuid
        }).save();
         
        if (user) {
          await auth
            .createUser({
              uid: uuid.toString(),
              email:  newUser.email,
              password: newUser.password,
            })
            .catch((error) => {
              console.log("Error creating new user:", error);
            });
        }

        if (user) {
          return {
            success: true,
            message: "ការបង្កើតអ្នកប្រើប្រាស់បានជោគជ័យ!",
            token: "",
          };
        }
      } catch (err) {
        return {
          success: false,
          message: "An error occured : " + err.message,
        };
      }
    },
    updateUser:async(_,{userId,newUser})=>{
      try {
        const userID = await UserSchema.findById(userId)
        if(!userID){
          return {
            success: false,
            message: " Can not find user ",
         
        }
        }
        const isUpdateUser = await UserSchema.findByIdAndUpdate(userId,newUser).exec();
         
        if (isUpdateUser){
        return {
            success: true,
            message: "Update User Success!",
         
        }
      }
      return {
        success: false,
        message: "Update User Faile!"
       
    }
          
        } catch (error) {
          return {
            success: false,
            message: "An error occured" + error.message,
          }
        }
    },
    deleteUser: async (_,{userId}) => {
      console.log(userId)
        try {
         const isDeleted =await UserSchema.findByIdAndDelete(userId)
           
          if (isDeleted)        
                    await auth
                    .deleteUser(userId)
                        .then(() => {
                            console.log('Successfully deleted user');
                        })
                        .catch((error) => {
                            console.log('Error deleting user:', error);
                        });
          return {
            success: true,
            message: "delete user success" ,
          }
        } catch (error) {
          return {
            success: false,
            message: "An error occured" + error.message,
          }
        }
    },
    refreshToken: async (_, { requestToken }, { User, RefreshToken }) => {
      try {
        if (!requestToken) {
          throw new ApolloError("សេចក្តីបញ្ជាក់មិនត្រឹមត្រូវទេ");
        }
        let get_token = await RefreshToken.findOne({ requestToken: requestToken });
        if (!get_token) {
          throw new ApolloError("សេចក្តីបញ្ជាក់មិនត្រឹមត្រូវទេ");
        }
        let user = await User.findById(get_token.user);
        let token = await issueAuthToken(user);
        return token
      } catch (error) {
        return {
          success: false,
          message: "An error occured" + error.message,
        }
      }
    },
    resetPassword: async (_, { userId, password }) => {
      try {
        const user = await UserSchema.findById(userId);
        if (!user) {
          return {
            success: false,
            message: "អ្នកប្រើប្រាស់មិនមាននៅក្នុងប្រព័ន្ធនេះទេ!",
          };
        }
        //user.password = await hash(password, 10);
        await user.save();
        return {
          success: true,
          message: "ការផ្លាស់ប្តូរពាក្យសម្ងាត់បានជោគជ័យ!",
        }
      } catch (error) {
        return {
          success: false,
          message: "An error occured" + error.message

        }
      }
    },
    login: async (_, { email, password }, { User, RefreshToken }) => {
      try {
        await UserAuthenticationRules.validate({ email, password }, { abortEarly: false });
        
        let user = await UserSchema.findOne({ email });
        if (!user) {
          throw new Error("អ្នកមិនទាន់បានកត់ឈ្មោះចូលទេ!");
        }

        let isMatch = await compare(password, user.password);
        if (!isMatch) {
          throw new ApolloError("ពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ!");
        }

        user = serializeUser(user);
        let token = await issueAuthToken(user);
        let refreshToken = await issueRefreshToken(user);
        let deleteToken = await RefreshToken.findOne({ user: user.id });
        let refresh_token = new RefreshToken({
          refreshToken: refreshToken.refreshToken,
          user: user.id,
        })
        let savedRefreshToken = await refresh_token.save();
        if (!savedRefreshToken) {
          throw new Error("មិនអាចរក្សាទុកបានទេ!");
        }
        const us = await UserSchema.findById(user.id)
        return {
          token: token,
          refreshToken: refreshToken,
          user: us
        }
      } catch (error) {
        return {
          success: false,
          message: "An occured error" + error.message
        }
      }
    }
  }
}