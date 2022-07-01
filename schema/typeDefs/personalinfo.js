const { gql } = require('apollo-server-express');

module.exports = gql`
    scalar Date
    type Query {
        getPersonalInfo: [PersonalInfo]
        getPersonalInfoByID(personalInfoId:ID) : PersonalInfo
        getPersonalInfoPagination(page:Int, limit:Int, keyword:String,  pagination:Boolean): PersonalInfoPagination
        
        getNewMember:[totalNewMenber]
        getVoter:[totalVoter]
        getAllMember: [getTotalMemberAndByGender]
        getTotalSector: [TotalSector]
        getMemberByDistrict:[GetMemberByDistric]
        getMemberByMonth:[getTotalMemberByMonth]
    },
    type Mutation {
        createPersonalInfo(newPersonalInfo:PersonalInfoInput):PersonalInfoResponse
        updatePersonalInfo(personalInfoId:ID,newPersonalInfo:PersonalInfoInput):PersonalInfoResponse
        deletePersonalInfo(personalInfoId:ID):PersonalInfoResponse

        addBackgroundToPersonalInfo(personalInfoId:ID, newPersonalInfo:backgroundInput):PersonalInfoResponse
        updateBackgroundToPersonalInfo(personalInfoId:ID, backgroundId:ID, newPersonalInfo:backgroundInput):PersonalInfoResponse
        deleteBackgroundFromPersonalInfo(personalInfoId:ID, backgroundId:ID):PersonalInfoResponse

        addFamilyInfoToPersonalInfo(personalInfoId:ID, newPersonalInfo:familyInfoInput):PersonalInfoResponse
        updateFamilyInfoToPersonalInfo(personalInfoId:ID,familyInfoId:ID, newPersonalInfo:familyInfoInput):PersonalInfoResponse
        deleteFamilyInfoToPersonalInfo(personalInfoId:ID,familyInfoId:ID ):PersonalInfoResponse

        
    }
    type GetMemberByDistric{
        _id:String
        totalMember:Int
        
    }
    type getTotalMemberAndByGender{
        totalMember:Int
        male:Int
        female:Int
    }
    type getTotalMemberByMonth{
        _id:Int
        totalMember:Int
    }

    type PersonalInfo{
        _id:ID
        fullName: String
        personalId: String
        nickName: String
        latin: String
        gender: String
        nation: String
        nationality: String
        religion: String
        dateOfBirth:Date
        tell: String
        identifier: String
        currentAddress:CurrentAddress
        placeOfBirth:Address
        passport: String
        email: String
        driverLicense: String
        healthy: String
        isVote:Boolean
        isNewMember:Boolean
        joiningDate: Date
        reasonJoining: String
        emergencyContact: [ EmergencyContact ]
        historic:[Historic]
        currentEducation:[CurrentEducation]
        background:[Background]
        familyInfo:[FamilyInfo]
        materialStatus:[MaterialStatus]
        shortCourse:[ShortCourse]
        skill:String,
        hobby:String,
        reference:Reference 
        image:String
        
    }
    type Reference{
    signeture: String,
    Date: Date,
    }
    input Referenceinput{
    signeture: String,
    Date: Date,
    }
    type totalNewMenber {
        allNewMenbers:Int
    }
    type totalVoter {
        totalVote:Int
    }
    type totalMember {
        totalMember:Int
        totalMale:Int
        totalFemale:Int
    }
    type TotalSector {
        totalSector:String
    }
    input PersonalInfoInput{
        fullName: String
        personalId: String
        nickName: String
        latin: String
        gender: String
        nation: String
        nationality: String
        religion: String
        dateOfBirth:Date
        currentAddress: CurrentAddressInput
        placeOfBirth: AddressInput
        tell: String
        identifier: String
        passport: String
        email: String
        driverLicense: String
        joiningDate:Date
        reasonJoining: String
        healthy: String
        isVote:Boolean
        isNewMember:Boolean
        emergencyContact: [ EmergencyContactInput ]
        historic:[historicInput]
        currentEducation:[currentEducationInput]
        background:[backgroundInput]
        familyInfo:[familyInfoInput]
        materialStatus:[materialStatusInput]
        shortCourse:[shortCourseInput]
        skill:String,
        hobby:String,
        reference:Referenceinput ,
        image:String,
    }
    type Historic{
        schoolName:String
        startDate:Date
        endDate:Date
        certificate:String
    }
    input historicInput{
        schoolName:String
        startDate:Date
        endDate:Date
        certificate:String
    }
    type Address{
        village: String
        commune: String
        district: String
        province: String
    }
    input AddressInput{
        village: String
        commune: String
        district: String
        province: String
    }
    input CurrentAddressInput{
        village:String,
        commune:String,
        district:String,
        province:String,
    }
    type CurrentAddress{
        village:String,
        commune:String,
        district:String,
        province:String,
    }

    type CurrentEducation{
        currentEducationKnowelege:CurrentEducationKnowelege
        universityEducation:UniversityEducation
    }
    input currentEducationInput{
        currentEducationKnowelege:CurrentEducationKnowelegeInput
        universityEducation:UniversityEducationInput
    }
    type CurrentEducationKnowelege {
        
        grade:String,
        part:String,
        major:String,
        schoolName:String
    }
    input CurrentEducationKnowelegeInput {
        
        grade:String,
        part:String,
        major:String,
        schoolName:String
    }
    type UniversityEducation{
        grade:String,
        major:String,
        year:String,
        schoolName:String
    }
    input UniversityEducationInput{
        grade:String,
        major:String,
        year:String,
        schoolName:String
    }
    
    type Background{
        workPlace:String,
        position:String,
        startDate:Date,
        endDate:Date
    }
    input backgroundInput{
        workPlace:String,
        position:String,
        startDate:Date,
        endDate:Date
    }
    type FamilyInfo{
        father:Father
        mother:Mother
        siblings:[Siblings]
    }
    input familyInfoInput{
        father:fatherInput
        mother:motherInput
        siblings:[siblingInput]
    }

    type Father{
        fatherName:String,
        age:Int,
        occupation:String,
        entity:String,
        address:String,
        tell:String
    }
    type Mother{
        motherName:String,
        age:Int,
        occupation:String,
        entity:String,
        address:String,
        tell:String
    }
    input fatherInput{
        fatherName:String,
        age:Int,
        occupation:String,
        entity:String,
        address:String,
        tell:String
    }
    input motherInput{
        motherName:String,
        age:Int,
        occupation:String,
        entity:String,
        address:String,
        tell:String
    }
    type Siblings{
        name:String,
        gender:String,
        dateOfBirth:Date,
        occupation:String,
        address:String,
        tell:String
        age:Int
        key:Date
    }
    input siblingInput{
        name:String,
        gender:String,
        dateOfBirth:Date,
        occupation:String,
        address:String,
        tell:String,
        age:Int
        key:Date
    }
    type EmergencyContact {
        emergencyNname:String,
        gender:String,
        age:Int,
        relative:String,
        tell:String,
        placeOfEmergency:String
    }
    type PersonalInfoPagination {
        personalInfo:[PersonalInfo]
        paginator: Paginator
    }
    type PersonalInfoResponse{
        success: Boolean
        message: String
    }
    input EmergencyContactInput {
        emergencyNname:String,
        gender:String,
        age:Int,
        relative:String,
        tell:String,
        placeOfEmergency:String
    }
    
    type MaterialStatus{
        status:String
        wifeOrhasband:String
        ages:Int
        address:String
        occupation:String
        tell:String
    }
    input materialStatusInput{
        status:String
        wifeOrhasband:String
        ages:Int
        address:String
        occupation:String
        tell:String
    }
    type ShortCourse{
        foriegnLanguage:String
        level:String,
        
    }
    input shortCourseInput{
        foriegnLanguage:String
        level:String,
        
    }
`