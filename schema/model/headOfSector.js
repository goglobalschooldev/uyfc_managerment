const mongoose = require('mongoose');
const Paginate = require('mongoose-paginate-v2');


const headOfSectorSchema = new mongoose.Schema({
    sectorName:String,
    remark: String,
    sectorMemberID :{ 
        type : mongoose.Schema.Types.ObjectId, 
        ref:'MemberSector'
     },
    note:String,
   
}, {timestamps:true});


headOfSectorSchema.plugin(Paginate);

const model = mongoose.model('HeadOfSectorSchema', headOfSectorSchema);
module.exports = model;