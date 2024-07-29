import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { Governorate, UsereRoles } from "../enums/enums";


export interface UserDocument extends mongoose.Document {
  _id:string;
  email: string;
  name: string;
  username: string;
  password: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  governorate:string;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: String,  enum:UsereRoles, required: true },
    governorate: { type: String,  enum:Governorate},
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next: any) {
  let user = this as unknown as UserDocument;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<Boolean> {
  const user = this as unknown as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
