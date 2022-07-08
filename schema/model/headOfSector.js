const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const headOfSectorSchema = new mongoose.Schema({
    
    sectorName:String,
    sectorMemberId:{                
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonalInforSchema',
    },
     remark: String,
     total:Number
   
}, {timestamps:true});


headOfSectorSchema.plugin(paginate);

const model = mongoose.model('HeadOfSectorSchema', headOfSectorSchema);
module.exports = model;