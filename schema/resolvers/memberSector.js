// const MemberSectorSchema = require('../model/memberSector');

// const  memberSectorLabel = {
//     docs: "memberSector",
//     limit: "perPage",
//     nextPage: "next",
//     prevPage: "prev",
//     meta: "paginator",
//     page: "currentPage",
//     pagingCounter: "slNo",
//     totalDocs: "totalDocs",
//     totalPages: "totalPages",
//   };
//   module.exports = {
//      Query: {
//         getMemberSector: async (_, {}) => {
//             try {
//                 const sectors = await MemberSectorSchema.find({});
//                 return sectors;
//             } catch (error) {
//                 return{
//                     success:false,
//                     message:"An error occured"+error.message
//                 }
//             }
//         },
//         getMemberSectorById: async (_,{sectorMemberID} )  => {
//             try {
//                 const findMemberById = await MemberSectorSchema.findById(sectorMemberID)
//                 if(!findMemberById){
//                     return {
//                     success:false,
//                     message: "មិនមាននៅក្នុងប្រព័ន្ធទេ"
//                     }
//                 }
//                 return findMemberById
                
//             } catch (error) {
//                 return{
//                     success:false,
//                     message:"An error occured"+error.message
//                 }
//             }

//         },
//         getMemberSectorPaginator: async(_, {page, limit, keyword,  pagination} )=>{
//             const options = {
//                 page: page || 1,
//                 limit: limit || 10,
//                 pagination: pagination,
//                 customLabels: memberSectorLabel,
//                 sort: {
//                     createdAt: -1,
//                 },
//                 populate: "",
//                     }
//             const query = {
//                 $or: [
//                     { 
//                         fullName: { $regex: keyword, $options: "i" } 
//                     },
//                  ],
//             }
            
//             const personalInfors = await MemberSectorSchema.paginate(query, options);
//             return personalInfors;
//         }
//      },
//      Mutation: {
//         createMemberSector: async (_, {newMember} ) => {
//            // console.log(newMember,MemberSector)
//             try {
//                 const member = new MemberSectorSchema(newMember);
//                 const isCreated = await member.save();
//                 if(!isCreated){
//                     return {
//                         success:false,
//                         message:"ការបង្កើតមុខងារត្រូវបានបរាជ័យ"
//                     }
//                 }
//                 return {
//                     success:true,
//                     message:"ការបង្កើតមុខងារបានជោគជ័យ"
//                 }
//             } catch (error) {
//                 return{
//                     success:false,
//                     message:"An error occured"+error.message
//                 }
//             }
//         },
//         updateMemberSector: async (_,{sectorMemberID,newMember} ) => {
//             try {
//                 const sectors = await  MemberSectorSchema.findById(sectorMemberID)
//                 if(!sectors){
//                     return{
//                         success:false,
//                         message:"មិនមាននៅក្នុងប្រព័ន្ធទេ"
//                     }
//                 }
//                 const updated = await MemberSectorSchema.findByIdAndUpdate(sectorMemberID,newMember)
//                 if(!updated){
//                     return{
//                         success: false,
//                         message: "ការកែប្រែត្រូវបានបរាជ័យ"
//                     }
//                 }
//                 return{
//                     success: true,
//                     message: "ការកែប្រែត្រូវបានជោគជ័យ"
//                 }
//             } catch (e) {
//                 return{
//                     success:false,
//                     message:"Error :" + e.message
//                 }
//             }
//         },
//         deleteMemberSector: async(_, {sectorMemberID} )=>{
//             try {
//                 const deleteProduct = await MemberSectorSchema.findByIdAndDelete(sectorMemberID);
//                 if(!deleteProduct){
//                     return{
//                         success: false,
//                         message: "Delete   failed."
//                     }
//                 }
//                 return{
//                     success: true,
//                     message: "Delete successfully. "
//                 }
//             } catch (error) {
//                 return{
//                     success: false,
//                     message: "Error, "+error
//                 }
//             }
//         }
//     }
    
//  }
