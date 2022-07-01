const mongoose = require('mongoose');
const Paginate = require('mongoose-paginate-v2');


const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
     
    phone:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    role:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
    },
    dob:Date,
    active:Boolean,
    profileImage:String,    
   
}, {_id:false});


userSchema.plugin(Paginate);

const model = mongoose.model('UserSchema', userSchema);
module.exports = model;