import mongoose from "mongoose";
import { Governorate, UsereRoles } from "../enums/enums";
import {encrypt} from "../../utils/encryption.util"
interface Election extends mongoose.Document{
  electionType : string,
  year:string,
  result: string,
  electionDetails: string
}

export interface Form extends mongoose.Document {
  _id:string;
  username: string;
  nickname: string;
  id: string;
  birth_date: String;
  gender:string;
  religion:string; // muslim / Christian
  phoneNumber:string;
  email:string;
  government:string;
  department:string;
  sheyakha:string;
  outsider:string;
  Specialization:string;
  degree:string;
  degree_description:string;
  highest_degree:string;
  Profession:string;
  union:string; // نقابة
  work_place:string;
  work_sector:string;
  position:string;
  fields:string;
  party_name:string;
  election_candidate:string;
  election_data:string;
  other_data:string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}
const electionSchema = new mongoose.Schema({
  electionType : { type: String},
  year:{ type: String},
  result: { type: String},
  electionDetails: { type: String}
})
const formSchema = new mongoose.Schema(
  {
    
  
    username: {type:String, required:true},
    nickname: {type:String, required:true},
    id: {type:String, required:true},
    birth_date: {type:String, required:true},
    gender:{type:String, required:true},
    religion:{type:String, required:true}, // muslim / Christian
    phoneNumber:{type:String, required:true},
    email:{type:String, required:true},
    government:{type:String, required:true},
    department:{type:String, required:true},
    sheyakha:{type:String},
    outsider:{type:String},
    specialization:{type:String, required:true},
    degree:{type:String, required:true},
    degree_description:{type:String, required:true},
    highest_degree:{type:String, required:true},
    profession:{type:String, required:true},
    union:{type:String, required:true}, // نقابة
    work_place:{type:String, required:true},
    work_sector:{type:String, required:true},
    position:{type:String, required:true},
    fields:{type:String, required:true},
    party_name:{type:String},
    election_candidate:{type:String},
    election_data:{type:String},
    other_data:{type:String}, 
  },
  {
    timestamps: true,
  }
);

formSchema.pre("save", async function (next: any) {
  let form = this as unknown as Form;
  if (!form.isModified("natId")) {
    return next();
  }
  
  let natIdEncrypted = encrypt(form.id);
  form.id = natIdEncrypted.encryptedData;

  return next();
});



const FormModel = mongoose.model<Form>("Form", formSchema);

export default FormModel;
