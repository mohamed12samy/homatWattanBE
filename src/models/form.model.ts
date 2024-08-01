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
  name: string;
  username: string;
  natId: string;
  issueDate: Date;
  issuePlace: string;
  dateOfBirth: Date;
  gender:string;
  religion:string; // muslim / Christian
  landLine:string;
  mobilePhone:string;
  email:string;
  residence:string;
  governorate:string;
  electionPlace:string;
  Specialization:string;
  educationDegree:string;
  educationDetails:string;
  Profession:string;
  workField:string;
  workPlace:string;
  union:string; // نقابة
  profissionDetails:string;
  participationِArea:string;
  previousMemberships:string;
  publicPositions:string;
  voluntaryPositions:string;
  experienceDetails:string;
  membershipRequestDate:Date;
  approverName:string;
  approverSatus:string;
  previouselections:Election[];
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
    
    name: { type: String},
  username:  { type: String},
  natId:  { type: String},
  issueDate: { type: Date},
  issuePlace:  { type: String},
  dateOfBirth: { type: Date},
  gender: { type: String},
  religion: { type: String}, // muslim / Christian
  landLine: { type: String},
  mobilePhone: { type: String},
  email: { type: String},
  residence: { type: String},
  electionPlace: { type: String},
  Specialization: { type: String},
  educationDegree: { type: String},
  educationDetails: { type: String},
  Profession: { type: String},
  workField: { type: String},
  workPlace: { type: String},
  union: { type: String}, // نقابة
  profissionDetails: { type: String},
  participationِArea: { type: String},
  previousMemberships: { type: String},
  publicPositions: { type: String},
  voluntaryPositions: { type: String},
  experienceDetails: { type: String},
  membershipRequestDate:{ type: Date},
  approverName: { type: String},
  approverSatus: { type: String},
  governorate: { type: String,  enum:Governorate},
  previouselections:{type:[electionSchema]}
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
  
  let natIdEncrypted = encrypt(form.natId);
  form.natId = natIdEncrypted.encryptedData;

  return next();
});



const FormModel = mongoose.model<Form>("Form", formSchema);

export default FormModel;
