import { omit } from "lodash";
import FormModel, { Form } from "../models/form.model";
import { FilterQuery } from "mongoose";
import { findUser } from "./user.service";
import notReadyFormModel from "../models/notReadyForm.model";

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

export async function getNotReadyForms(query: FilterQuery<any>, currentUserID: string)
{
    const { page, pageSize } = query;
    let currentUser = await findUser({_id:currentUserID});
    if(currentUser)
    {
        let forms = await notReadyFormModel.find({government:currentUser.governorate}).skip((page - 1) * pageSize)
        .limit(pageSize);
        
        let totalCounts = await notReadyFormModel.countDocuments({government: currentUser.governorate});
        let res = {forms, totalCounts}
        return res;
    }else return null;
}

export async function deleteForm(formId : string){
    let formDeleted = await FormModel.findByIdAndDelete(formId);
    return formDeleted;
}

export async function deleteNotReadyForms(formId : string){
  let formDeleted = await notReadyFormModel.findByIdAndDelete(formId);
  return formDeleted;
}

export async function updateNotReadyForm(formBody : any)
{
  let formToUpdate : Form = {...formBody};
  console.log(formToUpdate)
  
    let form = await FormModel.create(formBody);
    console.log(form)
    if(form)
    {await notReadyFormModel.findOneAndDelete({_id:form._id})
      return form;
    }
    else return null;
}