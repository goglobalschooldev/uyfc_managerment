const mongoose = require('mongoose');
const Paginate = require('mongoose-paginate-v2');


const personalInforSchema = new mongoose.Schema({

    personalId:String,
    fullName:String,
    nickName:String,
    latin:String,
    gender:{
        type:String,
        enum:['Male', 'Female']
    },
    nation:String,
   nationality:String,
   religion:String,
   dateOfBirth:Date,
   tell:String,
   identifier:String,
   passport:String,
   email:String,
   driverLicense:String,
   joiningDate:Date,
   reasonJoining:String,
   healthy:String,
   isVote:Boolean,
   isNewMember:{
    type:Boolean,
    default:true,
    required:true
   },   
    currentAddress: {  
      village:String,
      commune:String,
      district:String,
      province:String,
     } ,
    placeOfBirth: {
      village:String,
      commune:String,
      district:String,
      province:String,
     } ,
    emergencyContact:[
        {
         emergencyNname:String,
         gender:String,
         age:Number,
         relative:String,
         tell:String,
         placeOfEmergency:String
        }
    ],
    historic:[
        {
         
         schoolName:String,
         startDate:Date,
         endDate:Date,
         certificate:{
             type:String,
             enum:['Diploma', 'Bachelor Degree', 'Master', 'PhD','']
             
 
         }
     }
    ],
    
    currentEducation:[
        {
          
         currentEducationKnowelege: [{
         part:String,
         grade:String,
         major:String,
         schoolName:String,
         }],

         universityEducation: [{
             grade:String,
             major:String,
             year:String,
             schoolName:String,
             }]
        }
    ],
    background:[
        {
            workPlace:String,
            position:String,
            startDate:Date,
            endDate:Date
        }
    ],
    farmilyInfo:[{
         father:{
             fatherName:String,
             age:Number,
             occupation:String,
             entity:String,
             address:String,
             tell:String
         },
         mother:{
             motherName:String,
             age:Number,
             occupation:String,
             entity:String,
             address:String,
             tell:String
         },
         siblings:[
             {
                 name:String,
                 gender:{
                     type:String,
                     enum:["Male", "Female"]
                 },
                 dateOfBirth:Date,
                 occupation:String,
                 address:String,
                 tell:String,
                 age:Number,
                 key:Date
             }
         ]
     }
    ],
    materialStatus:[
        {
         status:{
             type:String,
             enum:["Single", "Married"]
         },
         wifeOrhasband:String,
         ages:String,
         address:String,
         occupation:String,
         tell:String,
        }
     ],
     shortCourse: [
       {
         foriegnLanguage: String,
         level:String,
     }
    ],
    skill:String,
    hobby:String,
    reference:[{
     signeture: String,
     Date: Date,
     }
    ] ,
    image:String,
   
}, {timestamps:true});

personalInforSchema.plugin(Paginate);

const model = mongoose.model('PersonalInforSchema', personalInforSchema);
module.exports = model;