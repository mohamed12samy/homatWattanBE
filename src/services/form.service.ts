import { omit } from "lodash";
import FormModel, { Form } from "../models/form.model";
import { FilterQuery } from "mongoose";
import { findUser } from "./user.service";
import notReadyFormModel from "../models/notReadyForm.model";
import { Neighborhoods, UsereRoles } from "../enums/enums";

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
      if(currentUser.role === UsereRoles.departmentHead)
      {
        let markaz :string =  Neighborhoods[currentUser.name.split(/[0-9]/)[0]][currentUser.name];
        console.log(markaz);
        let forms = await notReadyFormModel.find({department: { $regex: '.*' + markaz + '.*' }}).skip((page - 1) * pageSize)
        .limit(pageSize);
        
        let totalCounts = await notReadyFormModel.countDocuments({department: { $regex: '.*' + markaz + '.*' }});
        let res = {forms, totalCounts}
        return res;
      }
        else{
          const { department } = query;
          if(department)
          {
            console.log(department)
            let forms = await notReadyFormModel.find({department: { $regex: '.*' + department + '.*' }}).skip((page - 1) * pageSize)
              .limit(pageSize);
              
              let totalCounts = await notReadyFormModel.countDocuments({department: { $regex: '.*' + department + '.*' }});
              let res = {forms, totalCounts}
              return res;
          }
          else{
                  let forms = await notReadyFormModel.find({government:{ $regex: '.*' + currentUser.governorate + '.*' }}).skip((page - 1) * pageSize)
              .limit(pageSize);
              
              let totalCounts = await notReadyFormModel.countDocuments({government:{ $regex: '.*' + currentUser.governorate + '.*' }});
              let res = {forms, totalCounts}
              return res;
         }
        }
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