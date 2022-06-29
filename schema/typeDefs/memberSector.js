// const { gql } = require('apollo-server-express');
// module.exports = gql`
//     type Query {
//          getMemberSector: [MemberSector]
//          getMemberSectorById (sectorMemberID: ID ) :MemberSector
//          getMemberSectorPaginator(page:Int,limit:Int,keyword:String,pagination:String) : SectorPaginator 
//     }
//     type Mutation {
//         createMemberSector(newMember:MemberSectorInput):SectorMessage
//         updateMemberSector(sectorMemberID: ID , newMember:MemberSectorInput):SectorMessage
//         deleteMemberSector(sectorMemberID:ID):SectorMessage

//     }

//     type MemberSector {
//         firsName:  String
//         lastName:  String
//         gender:  String
//         age:  String
//         phoneNumber:  String
//         idCard:String
//         Email:  String
//         remark: String
     
//     }
//     type SectorMessage {
//         success:Boolean
//         message:String
//     }
//     input MemberSectorInput{
//         firsName:  String
//         lastName:  String
//         gender:  String
//         age:  String
//         phoneNumber:  String
//         idCard:String
//         Email:  String
//         remark: String
//     }
//     type SectorPaginator {
//         memberSector: [MemberSector]
//         paginator:Paginator!
//     }
 
//  `;