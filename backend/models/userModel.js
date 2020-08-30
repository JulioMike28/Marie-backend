import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true, index:true, dropDups:true},
    telefone:{type:String, required:true},
    endereco:{type:String, required:true},
    cep:{type:String, required:true},
    password:{type:String, required:true},
    isAdmin:{type:String, required:true, default:false}
});

const userModel = mongoose.model("User", userSchema);

export default userModel;