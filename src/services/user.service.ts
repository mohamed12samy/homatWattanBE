import { omit } from "lodash";
import UserModel, { UserDocument } from "../models/user.model";
import { FilterQuery } from "mongoose";

export async function createUser(
  input: Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
) {
  try {
    return await UserModel.create(input);
  } catch (e:any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  username,
  password
}: {
  username: string;
  password: string;
}) {
  const user = await UserModel.findOne({ username });
  if (!user) {
    return false;
  }
  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}

export async function getAllUsers(query: FilterQuery<any>, currentUser: any){
  return await UserModel.find(
    { _id: { $ne: currentUser } },
    { password: 0, __v: 0 }
  );
}
export async function deleteUserById(userId: string) {
  let user = await UserModel.findByIdAndDelete(userId);
  return user;
}
