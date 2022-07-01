const mongoose = require('mongoose');
const Paginate = require('mongoose-paginate-v2');


const roleSchema = new mongoose.Schema({
    roleName: String,
    note: String
},  {timestamps:true});
roleSchema.plugin(Paginate);
const Role = mongoose.model("Role", roleSchema);
module.exports = Role;