// const mongoose = require('mongoose');
// const Paginate = require('mongoose-paginate-v2');


// const memberSectorSchema = new mongoose.Schema({
//     firsName : {type: String},
//     lastName : {type: String} ,
//     gender :  {type: String},
//     age :  {type: String} ,
//     phoneNumber :  {type: String} ,
//     idCard: String,
//     Email :  {
//         type: String,
//         trim : true ,
//         lowercase :true , 
//         unique : true , 
//         requr : 'Email address is required',
//         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
//     },
//     idMember :   {type: String} , 
//     createdAt: {type : Date , default : new Date().toISOString()},
//     updatedAt : {type : Date , default : new Date().toISOString()},
//     status : {type : Boolean , default : true  },
   
// }, {timestamps:true});


// memberSectorSchema.plugin(Paginate);

// const model = mongoose.model('MemberSectorSchema', memberSectorSchema);
// module.exports = model;