const HeadOfSectorSchema = require('../model/headOfSector');

const  headOfSectorLabel = {
    docs: "headOfSector",
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
    Query:{
        getSectors:async(_, {})=>{
            try {
                const get = await HeadOfSectorSchema.find().populate('sectorMemberId')
                console.log("Get : " ,get)
                return get
                console.log("hello world")
            } catch (error) {
                return{
                    success:false,
                    message:"An error occured" + error.message
                }
            }
        },
        sumOfTotalSector:async(_, {})=>{
            //console.log(HeadOfSector)
            try {
                const getSector = await HeadOfSectorSchema.aggregate( [
                    { $group: { _id: null, total: { $sum: 1 } } },
                 ] )
                 console.log(getSector)
                return getSector
            } catch (error) {
                return{
                    success:false,
                    message:"An error occured"+error.message
                }
            }
        },
        getSectorById:async (_,{sectorID}) =>{
           
            try {
                const findSectorById = await HeadOfSectorSchema.findById(sectorID).populate('sectorMemberId')
                console.log(findSectorById)
                if(!findSectorById){
                    return{
                    success:false,
                    message: "មិនមាននៅក្នុងប្រព័ន្ធទេ"
                    }
                }
               return findSectorById
                
            } catch (error) {
                return{
                    success:false,
                    message:"An error occured" + error.message
                }
            }

        },
        getSectorPaginator: async(_, {page, limit, keyword,  pagination})=>{
            const options = {
                page: page || 1,
                limit: limit || 10,
                pagination: pagination,
                customLabels: headOfSectorLabel,
                sort: {
                    createdAt: -1,
                },
                populate: "",
                    }
            const query = {
                // $or: [
                //     { 
                //         sectorName: { $regex: keyword, $options: "i" } 
                //     },
                //  ],
            }
            const sectors = await HeadOfSectorSchema.paginate(query, options);
            return sectors;
        },
        
    },
    Mutation : {
        createSector:async(_, {newSector})=>{
           
            try {
                const findSector = await HeadOfSectorSchema.findOne({sectorName:newSector.sectorName})
                if(findSector){
                    return{
                        success:false,
                        message:"ទិន្នន័យមានម្តងរួចហើយ"
                    }
                }
                const sector = new HeadOfSectorSchema(newSector)
                const isCreated = await sector.save()
                if(!isCreated){
                    return{
                        success:true,
                        message: "ការបង្កើតមុខងារត្រូវបានបរាជ័យ"
                    }
                }
                return {
                    success:true,
                    message: "ការបង្កើតមុខងារត្រូវបានជោគជ័យ"
                }
            } catch (error) {
                return { 
                    success:false,
                    message:"Get Error :"+error.message
                }
            }
        },
        updateSector: async (_,{sectorID,newSector}) => {
            try {
                const sector = await HeadOfSectorSchema.findById(sectorID)
                if(!sector){
                    return{
                        success:false,
                        message: "មិនមាននៅក្នុងប្រព័ន្ធទេ"
                    }
                }
                const isUpdated = await HeadOfSectorSchema.findByIdAndUpdate(sectorID,newSector)
                if(!isUpdated){
                    return{
                        success: false,
                        message: "ការកែប្រែត្រូវបានបរាជ័យ"
                    }
                }
                return{
                    success: true,
                    message: "ការកែប្រែត្រូវបានជោគជ័យ"
                }
            } catch (e) {
                return { 
                    success:false,
                    message:"Get Error :"+error.message
                }
            }
        },
        deleteSector: async (_,{sectorID}) =>{
            try {
                const find = await HeadOfSectorSchema.findById(sectorID)
                if(!find){
                    
                    return{
                    success:false,
                    message: "Sector not found"
                        
                    }
                }
                const deleted = await HeadOfSectorSchema.findByIdAndDelete(sectorID)
                if(!deleted){
                    return{
                        success:true,
                        message: "delete sector fail"
                        }
                }
                return {
                    success: true,
                    message:"delete succesfully"
                }
            } catch (e) {
                return { 
                    success:false,
                    message:"Get Error :"+error.message
                }
            }
        }
    }
}