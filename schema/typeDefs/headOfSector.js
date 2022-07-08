const { gql } = require('apollo-server-express');
module.exports = gql`
    type Query {
        getSectors:[Sector]
        getSectorById (sectorID: ID) :Sector
        getSectorPaginator(page:Int, limit:Int,keyword:String,pagination:Boolean) : SectorPaginator
        sumOfTotalSector:[totalSector]
    }
    type Mutation {
        createSector (newSector:SectorInput ) :SectorMessage
        updateSector (sectorID:ID , newSector:SectorInput ):SectorMessage
        deleteSector(sectorID:ID ) :SectorMessage
    }
   type totalSector{
    total:Int
   }
    type Sector {
     _id:ID, 
    sectorName:String,
    sectorMemberId:PersonalInfo ,
    remark: String,
    }
    input SectorInput{
        sectorName:String
        sectorMemberId:ID
        remark: String
    }
    type SectorMessage{
        success: Boolean
        message: String
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
    type SectorPaginator{
      sector:[Sector]
      paginator:Paginator
    }

`;