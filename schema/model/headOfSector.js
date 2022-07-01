const mongoose = require('mongoose');
const Paginate = require('mongoose-paginate-v2');
const headOfSectorSchema = new mongoose.Schema({
    
    sectorName:String,
    sectorMemberId:{                
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonalInforSchema',
    },
     remark: String,
     total:Number
   
}, {timestamps:true});


headOfSectorSchema.plugin(Paginate);

const model = mongoose.model('HeadOfSectorSchema', headOfSectorSchema);
module.exports = model;