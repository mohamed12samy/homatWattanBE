import mongoose from "mongoose";
import { Governorate, UsereRoles } from "../enums/enums";
import {encrypt} from "../../utils/encryption.util"

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

const notReadyFormSchema = new mongoose.Schema(
  {
    
  
    username: {type:String},
    nickname: {type:String},
    id: {type:String},
    birth_date: {type:String},
    gender:{type:String},
    religion:{type:String}, // muslim / Christian
    phoneNumber:{type:String},
    email:{type:String},
    government:{type:String},
    department:{type:String},
    sheyakha:{type:String},
    outsider:{type:String},
    specialization:{type:String},
    degree:{type:String},
    degree_description:{type:String},
    highest_degree:{type:String},
    profession:{type:String},
    union:{type:String}, // نقابة
    work_place:{type:String},
    work_sector:{type:String},
    position:{type:String},
    fields:{type:String},
    party_name:{type:String},
    election_candidate:{type:String},
    election_data:{type:String},
    other_data:{type:String}, 
  },
  {
    timestamps: true,
  }
);

notReadyFormSchema.pre("save", async function (next: any) {
  let form = this as unknown as Form;
  if (!form.isModified("natId")) {
    return next();
  }
  
  let natIdEncrypted = encrypt(form.id);
  form.id = natIdEncrypted.encryptedData;

  return next();
});

const NotReadyFormModel = mongoose.model<Form>("notReadyForms", notReadyFormSchema);

export default NotReadyFormModel;//mongoose.models.notReadyForms || mongoose.model<Form>("notReadyForms", notReadyFormSchema);
