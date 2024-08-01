import { omit } from "lodash";
import FormModel, { Form } from "../models/form.model";
import { FilterQuery } from "mongoose";
import { findUser } from "./user.service";

export async function createForm(
  input: Omit<Form, "createdAt" | "updatedAt">
) {
  try {
    return await FormModel.create(input);
  } catch (e:any) {
    throw new Error(e);
  }
}

export async function getAllForms(query: FilterQuery<Form>, currentUserID: string)
{
    let currentUser = await findUser({_id:currentUserID});

    if(currentUser)
    {
        return await FormModel.find({governorate: currentUser.governorate});
    }else return null;
}

export async function deleteForm(formId : string){
    let formDeleted = await FormModel.findByIdAndDelete(formId);
    return formDeleted;
}