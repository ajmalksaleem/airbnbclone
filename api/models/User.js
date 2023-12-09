const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },      //The keyword unique is a specific property provided by 
    password: String                            //Mongoose for defining unique constraints on fields within a schema
});

const UserModel = mongoose.model('Usercol', UserSchema);

module.exports = UserModel;