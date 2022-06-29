const { gql } = require('apollo-server-express');

module.exports = gql`
    type Query {
        getSectors:[Sector]
        getSectorById (sectorID: ID) :Sector
        getSectorPaginator(page:Int, limit:Int,keyword:String,pagination:String) : SectorPaginator
        sumOfTotalSector:[totalSector]
        
        
    }
    type Mutation {
        createSector (newSector:SectorInput ) :SectorMessage
        updateSector (sectorID:ID , newSector:SectorInput ) : SectorMessage
        deleteSector(sectorID:ID ) :SectorMessage
    }
   type totalSector{
    total:Int
   }
    type Sector {
        sectorName:String
        remark:String
        #sectorMemberID:MemberSector
    }
    input SectorInput{
        sectorName:String
        remark: String
        #sectorMemberID:ID
    }
    type SectorMessage{
        success: Boolean
        message: String
    }
    type SectorPaginator{
        sectorName:[Sector]
        paginator:Paginator!
    }

`;