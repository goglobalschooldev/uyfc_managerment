  
const PersonalInforSchema = require('../model/personalInfo');

const personalInfoLabel = {
    docs: "personalInfo",
    limit: "perPage",
    nextPage: "next",
    prevPage: "prev",
    meta: "paginator",
    page: "currentPage",
    pagingCounter: "slNo",
    totalDocs: "totalDocs",
    totalPages: "totalPages",
};
module.exports ={

    Query: {
        getPersonalInfo:async(_, {},  )=>{
            try {
                const get = await PersonalInforSchema.find()
                console.log(get)
                return get
            } catch (error) {
                return{
                    success:false,
                    message:"An error occured"+error.message
                }
            }
        },
        getPersonalInfoByID:async (_,{personalInfoId} )=> {
            try {
                const getById = await PersonalInforSchema.findById(personalInfoId)
                return getById
            } catch (e) {
                return{
                    success:false,
                    message:"An error occured"+error.message
                }
            }
        },
        getPersonalInfoPagination: async(_, {page, limit, keyword,  pagination} )=>{
            const options = {
                page: page || 1,
                limit: limit || 10,
                pagination: pagination,
                customLabels: personalInfoLabel,
                
                sort: {
                    createdAt: -1,
                },
                populate: "",
                    }
            const query = {
                // $or: [
                //     { 
                //         fullName: { $regex: keyword, $options: "i" } 
                //     },
                //  ],
            }
            const personalInfors = await PersonalInforSchema.paginate(query, options);
            return personalInfors;
        },
        getNewMember:async(_, {} )=>{
            try {
                const newMember = await PersonalInforSchema.aggregate( [
                    {
                        $match:{isNewMember:true}
                    },
                    { $group: { _id: null, allNewMenbers: { $sum: 1 } } },
                 ] )
                 console.log(newMember)
                 return newMember
            } catch (error) {
                return{
                    success:false,
                    message:"An occured error" + error.message
                }
            }
        },
        getVoter: async (_, {} ) => {
            try {
                const Voter = await PersonalInforSchema.aggregate( [
                    {
                        $match:{isVote:true}
                    },
                    { 
                        $group: { _id: null, totalVote: { $sum: 1 } } 
                    } 
                 ])
                 return Voter
            } catch (error) {
                return{
                    success:false,
                    message:"An occured error" + error.message
                }
            }
        },
        getAllMember: async (_, {} ) => {
            try {
                const allMember = await PersonalInforSchema.aggregate([
                    {
                        $project:{
                            _id:1,
                            male: {$cond: [{$eq: ['$gender','Male']},1,0]},
                            female:{$cond: [{$eq: ['$gender','Female']},1,0]},
                        }
                    },
                    {
                        $group:{
                            _id:null,
                            totalMember:{$sum:1},
                            male: { $sum: '$male'  },
                            female: {  $sum: '$female' },
                        }
                    }
                ])
                 return allMember
            } catch (error) {
                return{
                    success:false,
                    message:"An occured error" + error.message
                }
            }
        },
        getTotalSector: async (_, {} ) => {
            try {
                const sectors = await PersonalInforSchema.aggregate( [
                     
                    { $group: {
                         _id: null,
                        totalSector: { $sum: 1 } 
                    } },
                 ] )
                 return sectors
            } catch (error) {
                return{
                    success:false,
                    message:"An occured error" + error.message
                }
            }
        },
        getMemberByDistrict:async(_, {} )=>{
            try {
                let query =[
                        {
                            $project:{
                                currentAddress:1
                            }
                        },
                        
                        {
                            $group:{
                                _id:"$currentAddress.district",
                                totalMember:{$sum:1}
                            }
                    },
                ]
                let get = await PersonalInforSchema.aggregate(query).sort({totalMember:-1}).limit(5)
                return get
            } catch (error) {
                return {
                    success:false,
                    message:"An error occured" + error.message
                }
            }
        },
        getMemberByMonth:async(_, {} )=>{
            try {
                const getByMonth = await PersonalInforSchema.aggregate([
                    {
                        $project:
                          {
                            month: { $month: "$joiningDate" },
                          }
                      },
                    {
                        $group:{
                            _id:"$month",
                            totalMember:{$sum:1}
                        }
                    }
                ])
               return getByMonth
            } catch (error) {
                return {
                    success:false,
                    message:"An error occured" + error.message
                }
            }
        }
}
     ,
    Mutation: {
        createPersonalInfo:async (_,{newPersonalInfo} ) => {
            console.log(newPersonalInfo)
            try {
                const personalInfo =  await PersonalInforSchema.findOne({fullName:newPersonalInfo.fullName})
                if(personalInfo){
                    return{
                        success:false,
                        message:"បុគ្គលត្រូវបានបញ្ជូលម្ដងហើយ!"
                    }
                }
                const createPersonal = await PersonalInforSchema(newPersonalInfo);
                const iscreate = await createPersonal.save();
                
                if(!iscreate){
                    return {
                        success: false,
                        message: "ការបង្កើតត្រូវបានបរាជ័យ"
                    }
                }
                return {
                    success: true,
                    message: "ការបង្កើតត្រូវបានជោកជ័យ"
                }
            } catch (e) {
                return {
                    success: false,
                    message: "Error :" + e.message
                }
            }
        },
        updatePersonalInfo: async (_,{personalInfoId,newPersonalInfo} ) => {
            try {
                const findId = await PersonalInforSchema.findById(personalInfoId)
                if(!findId){
                    return{
                        success:false,
                        message:"មិនមានព័ត៌មានសម្រាប់ ធ្វើការកែប្រែទេ "
                    }
                }
                const updatePersonal = await PersonalInforSchema.findByIdAndUpdate(personalInfoId,newPersonalInfo)
                if(!updatePersonal) {
                    return{
                        success:false,
                        message:"ការកែប្រែត្រូវបានបរាជ័យ"
                    }
                }
                return{
                    success:true,
                    message:"ការកែប្រែត្រូវបានជោគជ័យ"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "Error :" + error.message
                }
            }
        },
        deletePersonalInfo: async (_,{personalInfoId} ) => {
            try {
                const deleted = await PersonalInforSchema.findByIdAndDelete(personalInfoId)
                if(!deleted){
                    return{
                        success: false,
                        message: "delete Info fail"
                    }
                }
                return {
                    success:  true,
                    message:  "delete success"
                }

            } catch (error) {
                return {
                    success: false,
                    message: "Error :" + error.message
                }
            }
        },
        addBackgroundToPersonalInfo:async(_, {personalInfoId, newPersonalInfo} )=>{
            try {
                const findPersonalInfo = await PersonalInforSchema.findById(personalInfoId)
                if(!findPersonalInfo){
                    return{
                        success:false,
                        message:"មិនមានបុគ្គលនៅក្នុងប្រព័ន្ធយើងទេ"
                    }
                }
                const personalInfo = await PersonalInforSchema.findByIdAndUpdate(personalInfoId, {
                     $push: {background:newPersonalInfo}
                })
                if(!personalInfo){
                    return{
                        success:false,
                        message:"បង្កើតប្រវត្តិការងារបានបរាជ័យ"
                    }
                }
                return{
                    success:true,
                    message:"បង្កើតប្រវត្តិការងារបានជោគជ័យ"
                }
            } catch (error) {
                return {
                    success:false,
                    message:"បង្កើតប្រវត្តិនិងកម្រិតសិក្សាមិនបានជោគជ័យ" + error.message
                }
            }
        },
        updateBackgroundToPersonalInfo:async(_,{personalInfoId, backgroundId, newPersonalInfo}  )=>{
            try {
                const findPersonalInfo = await PersonalInforSchema.findById(personalInfoId)
                if(!findPersonalInfo){
                    return{
                        success:false,
                        message:"មិនមាននៅក្នុងប្រព័ន្ធយើងទេ"
                    }
                }
               const  updatePersonalInfo = await PersonalInforSchema.updateOne(
                    {personalInfoId, backgroundId, newPersonalInfo },
                    {
                        $set:{background:newPersonalInfo}
                    }
               )
               if(!updatePersonalInfo){
                return{ 
                    success:false,
                    message:" ការកែប្រែប្រវត្តិនិងកម្រិតសិក្សាមិនបានជោគជ័យ"
                }
               }
               return{
                    success:true,
                    message:"ការកែប្រែប្រវត្តិនិងកម្រិតសិក្សាបានជោគជ័យ"
            }
            } catch (error) {
                 return {
                    success:false,
                    message:"បង្កើតប្រវត្តិនិងកម្រិតសិក្សាមិនបានជោគជ័យ" + error.message
                }
            }
        },
        deleteBackgroundFromPersonalInfo:async(_, {personalInfoId, backgroundId} )=>{
            try {
                const personalInfo = await PersonalInforSchema.findById(personalInfoId)
                if(!personalInfo){
                    return{
                        success:false,
                        message:"មិនមានបុគ្គលនៅក្នុងប្រព័ន្ធយើងខ្ញំុទេ"
                    }
                }
                const deleted = await PersonalInforSchema.updateOne(
                    {personalInfoId, backgroundId},
                    {
                        $pull:{background:{_id:backgroundId}}
                    }
                )
                if(!deleted){
                    return{
                        success:true,
                        message:"ការលុបត្រូវបានបរាជ័យ"
                    }
                }
                return{
                    success:true,
                    message:"ការលុបត្រូវបានជោគជ័យ"
                }
            } catch (error) {
                return{
                    success:false,
                        message:"ការលុបត្រូវបានបរាជ័យ"+error.message
                }
            }
        },
        addFamilyInfoToPersonalInfo:async(_, {personalInfoId, newPersonalInfo} )=>{
            console.log(personalInfoId,
                newPersonalInfo)
            try {
                const personalInfo = await PersonalInforSchema.findById(personalInfoId)
                if(!personalInfo){
                    return{
                        success:false,
                        message:"ការបញ្ចូលបានបរាជ័យ"
                    }
                }
                const addfamily = await PersonalInforSchema.updateOne(
                    {personalInfoId},
                    {
                        $push:{farmilyInfo:newPersonalInfo}
                    }
                )
                if(!addfamily){
                    return{
                        success:false,
                        message:"O1"
                    }
                }

                return{
                    success:true,
                    message:"Success"
                }
            } catch (error) {
                return{
                    success:false,
                    message:"Error :" + error.message
                }
            }
        },
        updateFamilyInfoToPersonalInfo:async (_,{personalInfoId , familyInfoId,newPersonalInfo} ) => {
            try {
                const family = await PersonalInforSchema.findById(personalInfoId)
                if(!family){
                    return {
                        success:false,
                        message:"don't have the family"
                    }
                }
                const updateFamilyInfo = await PersonalInforSchema.updateOne({personalInfoId , familyInfoId,newPersonalInfo},
                   { $set:{farmilyInfo: newPersonalInfo}}
                    )
                    if(!updateFamilyInfo){
                        return {
                            success:false,
                            message:"Cannot update familyInfo"
                        }
                    }
                    return {
                        success:true,
                        message:"Update successfully"
                    }
            } catch (error) {
                return{
                    success:false,
                    message:"O2" + error.message
                }
            }
        },
        deleteFamilyInfoToPersonalInfo:async (_,{personalInfoId , familyInfoId} ) =>{
            try {
                const familyId = await PersonalInforSchema.findById(personalInfoId)
                if(!familyId){
                    return{
                        success:false,
                        message:"មិនមាននៅក្នុងប្រព័ន្ធទេ"
                    }
                }
                const deleteFamilyInfo = await PersonalInforSchema.updateOne({personalInfoId , familyInfoId},
                    { $pull: {farmilyInfo: {_id:familyInfoId}}}
                    )
                    if(!deleteFamilyInfo){
                        return {
                        success:false,
                        message:"មិនអាចលុបបានទេ"
                        }
                    }
                    return {
                        success: true ,
                        message:"ការលុបត្រូវបានជោគជ័យ"
                    }
            } catch (error) {
                return{
                    success:false,
                    message:"O3" + error.message
                }
            }
        },
        addForiegnLanguage:async(_,{personalInfoId,newForiegnLanguage})=>{
            try {
                const personalInfo = await PersonalInforSchema.findById(personalInfoId)
                if(!personalInfo){
                    return{
                        success:false,
                        message:"ការបញ្ចូលបានបរាជ័យ"
                    }
                }
                const addForiegnLanguage = await PersonalInforSchema.findByIdAndUpdate(personalInfoId,{
                    $push:{shortCourse:newForiegnLanguage}
                })
                if(!addForiegnLanguage){
                    return{
                        success:false,
                        message:"ការបន្ថែមភាសារត្រូវបានបរាជ័យ"
                    }
                }
                return{
                    success:true,
                    message:"ការបន្ថែមភាសារត្រូវបានជោគជ័យ"
                }
            } catch (error) {
                return{
                    success:false,
                    message:"Eorrer" + error.message
                }
            }
        },
        updateForiegnLanguage:async(_,{personalInfoId,foriegnLanguageId,newForiegnLanguage})=>{
            console.log(personalInfoId,foriegnLanguageId,newForiegnLanguage)
            try {
                const update = await PersonalInforSchema.updateOne(
                    {personalInfoId, foriegnLanguageId},
                    {
                        $set:{
                            shortCourse:newForiegnLanguage
                        }
                    }
                )
                if(!update){
                    return{
                        success:false,
                        message:"Update ForiengLaguage failse"
                    }
                }
                return{
                    success:true,
                    message:"ការកែប្រែបានជោគជ័យ"
                }
            } catch (error) {
                return{
                    success:false,
                    message:"Eorrer" + error.message
                }
            }
        },
        deleteForiegnLanguage:async(_,{personalInfoId,foriegnLanguageId}) => {
            try {
                const isDelete = await PersonalInforSchema.updateOne(
                    {personalInfoId, foriegnLanguageId},
                    {
                         $pull:{shortCourse:{_id:foriegnLanguageId}}
                    }
                )
                if(!isDelete){
                    return {
                        success:false,
                        message:"ការលុបត្រូវបានបរាជ័យ"
                    }
                }
                return{
                    success:true,
                    message:"ការលុបត្រូវបានជោគជ័យ"
                }
            } catch (error) {
                return{
                    success:false,
                    message:"Eorrer" + error.message
                }
            }
        }
    }
}