import mongoose from "mongoose";
import { Governorate, UsereRoles } from "../enums/enums";
import { encrypt } from "../../utils/encryption.util";
interface Election extends mongoose.Document {
  electionType: string;
  year: string;
  result: string;
  electionDetails: string;
}

export interface Form extends mongoose.Document {
  _id: string;
  username: string;
  nickname: string;
  id: string;
  birth_date: String;
  gender: string;
  religion: string; // muslim / Christian
  phoneNumber: string;
  email: string;
  government: string;
  department: string;
  sheyakha: string;
  outsider: string;
  Specialization: string;
  degree: string;
  degree_description: string;
  highest_degree: string;
  Profession: string;
  union: string; // نقابة
  work_place: string;
  work_sector: string;
  position: string;
  fields: string;
  party_name: string;
  election_candidate: string;
  election_data: string;
  knew: string;
  other_data: string;
  isApproved: boolean;
  renewed: boolean;
  memberId: string;
  memberIdSuffix: number;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}
const electionSchema = new mongoose.Schema({
  electionType: { type: String },
  year: { type: String },
  result: { type: String },
  electionDetails: { type: String }
});
const formSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    nickname: { type: String },
    id: { type: String, required: true },
    birth_date: { type: String },
    gender: { type: String, required: true },
    religion: { type: String, required: true }, // muslim / Christian
    phoneNumber: { type: String, required: true },
    email: { type: String },
    government: { type: String, required: true },
    department: { type: String, required: true },
    sheyakha: { type: String },
    outsider: { type: String },
    specialization: { type: String },
    degree: { type: String, required: true },
    degree_description: { type: String },
    highest_degree: { type: String },
    profession: { type: String },
    union: { type: String }, // نقابة
    work_place: { type: String },
    work_sector: { type: String },
    position: { type: String },
    fields: { type: String, required: true },
    knew: { type: String },
    party_name: { type: String },
    election_candidate: { type: String },
    election_data: { type: String },
    other_data: { type: String },
    isApproved: { type: Boolean, default: false },
    renewed: { type: Boolean, default: false },
    memberId: { type: String },
    memberIdSuffix: { type: Number }
  },
  {
    timestamps: true
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
