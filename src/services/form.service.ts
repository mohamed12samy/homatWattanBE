import { omit } from "lodash";
import FormModel, { Form } from "../models/form.model";
import mongoose, { FilterQuery, Model } from "mongoose";
import { findUser } from "./user.service";
import notReadyFormModel from "../models/notReadyForm.model";
import { GovernmentsMapping, GovernoratesCodes, Neighborhoods, UsereRoles } from "../enums/enums";
import validate from "../middlewares/validateResource";
import { createFormSchema } from "../schemas/form.schema";
import { isAborted } from "zod";
import { Workbook } from "exceljs";
import { exportFormsToExcel } from "../../utils/excelGenerator.util";

export async function createForm(input: Omit<Form, "createdAt" | "updatedAt">) {
  try {
    let existForms = await FormModel.find({ id: input.id });
    if (existForms && existForms.length > 0) {
      return { error: { message: "Form already exists", forms: existForms } };
    }

    let parseResult = createFormSchema.safeParse({ body: input });
    if (parseResult.success) {
      return await FormModel.create(input);
    } else {
      return await notReadyFormModel.create(input);
    }
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getForms(
  query: FilterQuery<Form>,
  currentUserID: string,
  model: mongoose.Model<any>,
  isApproved: boolean | null
) {
  const { page, pageSize, id, memberId } = query;
  let currentUser = await findUser({ _id: currentUserID });

  if (currentUser) {
    let filterQuery: any = {};
    switch (currentUser.role) {
      case UsereRoles.departmentHead:
        let markaz: string =
          Neighborhoods[currentUser.name.split(/[0-9]/)[0]][currentUser.name];
        filterQuery = {
          department: { $regex: ".*" + markaz + ".*" },
          government: { $regex: ".*" + currentUser.governorate + ".*" },
          isApproved: isApproved
        };
        break;
      case UsereRoles.admin:
        const { department, government } = query;
        filterQuery =
          department && government
            ? { department, government, isApproved }
            : department
            ? { department, isApproved }
            : government
            ? { government, isApproved }
            : { isApproved };
        break;
      case UsereRoles.governorator:
        filterQuery = {
          government: { $regex: ".*" + currentUser.governorate + ".*" },
          isApproved: isApproved
        };
        break;
      default:
        return null;
    }

    if (id) {
      filterQuery = { ...filterQuery, id: { $regex: ".*" + id + ".*" } };
    }
    if (memberId) {
      filterQuery = {
        ...filterQuery,
        memberId: { $regex: ".*" + memberId + ".*" }
      };
    }
    return await filterDataWithCount(model, filterQuery, {
      page,
      pageSize
    });
  }
}

export async function deleteForm(formId: string) {
  let formDeleted = await FormModel.findByIdAndDelete(formId);
  return formDeleted;
}

export async function deleteNotReadyForms(formId: string) {
  let formDeleted = await notReadyFormModel.findByIdAndDelete(formId);
  return formDeleted;
}

export async function updateNotReadyForm(formBody: any) {
  let existForms = await FormModel.find({ id: formBody.id });
  if (existForms && existForms.length > 0) {
    return { error: { message: "Form already exists", forms: existForms } };
  }

  let parseResult = createFormSchema.safeParse({ body: formBody });
  if (parseResult.success) {
    let formToUpdate: Form = { ...formBody };
    let form = await FormModel.create(formBody);
    if (form) {
      await notReadyFormModel.findOneAndDelete({ _id: form._id });
      return form;
    }
  }
  return { error: { message: "validation error" } };
}

export async function approveForm(formBody: Form, currentUserId: string) {
  let form = await FormModel.findById(formBody._id);

  if (form) {
    if (form?.isApproved)
      return { error: { message: "form is approved already" } };

    let currentUser = await findUser({ _id: currentUserId });
    if (currentUser === null || currentUser === undefined)
      return { error: { message: "user is not found" } };
    let government: string = currentUser.name.split(/[0-9]/)[0];
    //let markaz: string = Neighborhoods[government][currentUser.name];

    let lastMemeber: any = await FormModel.findOne(
      {
        government: { $regex: ".*" + form.government + ".*" },
        memberIdSuffix: { $exists: true, $ne: null }
      },
      { memberIdSuffix: 1 }
    )
      .sort({ memberIdSuffix: -1 })
      .limit(1);

    const newNumber: number = lastMemeber?.memberIdSuffix
      ? +lastMemeber.memberIdSuffix + 1
      : 1;
    const newNumberStr: string = newNumber.toString();
    const totalLength: number = 7;
    const numberOfLeadingZeros: number = totalLength - newNumberStr.length;
    const prefix: string =
      GovernoratesCodes[GovernmentsMapping[form.government] as keyof typeof GovernoratesCodes] +
      "0".repeat(numberOfLeadingZeros);

    const newMemberId: string = prefix + newNumberStr;
    let formToBeUpdated = {
      ...formBody,
      isApproved: true,
      ApprovedBy:currentUser.username,
      memberId: newMemberId,
      memberIdSuffix: newNumber
    };
    let result = await FormModel.updateOne(
      { _id: formToBeUpdated._id },
      { $set: formToBeUpdated },
      { runValidators: true }
    );
    if (result.acknowledged && result.modifiedCount > 0) return formToBeUpdated;
    else return { error: { message: "form not updated" } };
  } else return { error: { message: "form is not found" } };
}


export async function getNotFilledRequiredFieldsPercentage(
  currentUserID: string
) {
  let currentUser = await findUser({ _id: currentUserID });
  const requiredFields = [
    "username",
    "id",
    "gender",
    "religion",
    "phoneNumber",
    "government",
    "department",
    "degree",
    "fields"
  ];

  if (currentUser) {
    let markaz: string =
      Neighborhoods[currentUser.name.split(/[0-9]/)[0]][currentUser.name];
    let regexCondition = { department: { $regex: ".*" + markaz + ".*" } };
    console.log(regexCondition);
    console.log(markaz);

    try {
      // Retrieve all documents
      const documents = await notReadyFormModel.find({
        department: { $regex: ".*" + markaz + ".*" }
      });
      let totalCount: number = 0;
      let docCounts: number = 0;
      // Process each document to count missing required fields
      const missingFieldsCount = documents.map((doc) => {
        docCounts++;
        totalCount = 0;
        requiredFields.forEach((field) => {
          if (
            !doc[field as keyof typeof doc] ||
            doc[field as keyof typeof doc].trim() === ""
          ) {
            totalCount++;
          }
        });

        return totalCount;
      });
      const sum: number = missingFieldsCount.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      let percentage = (sum / (9 * docCounts)) * 100;
      // console.log('Missing fields count for each document:', missingFieldsCount,
      // sum, docCounts, percentage);
      return {
        percentage,
        totalFormsCount: docCounts,
        missingFieldsCount,
        sum
      };
    } catch (err) {
      console.error("Error fetching documents:", err);
    }
  } else return null;
}

export async function getFormsCount(currentUserID: string, query: any) {
  let currentUser = await findUser({ _id: currentUserID });
  if (currentUser) {
    let filterQuery: any = {};
    switch (currentUser.role) {
      case UsereRoles.departmentHead:
        let markaz: string =
          Neighborhoods[currentUser.name.split(/[0-9]/)[0]][currentUser.name];
        filterQuery = {
          department: { $regex: ".*" + markaz + ".*" },
          government: { $regex: ".*" + currentUser.governorate + ".*" }
        };
        break;
      case UsereRoles.admin:
      case UsereRoles.adminViewer:
        const { department, government } = query;
        filterQuery =
          department && government
            ? { department, government }
            : department
            ? { department }
            : government
            ? { government }
            : {};
        break;
      case UsereRoles.governorator:
        filterQuery = {
          government: { $regex: ".*" + currentUser.governorate + ".*" }
        };
        break;
      default:
        return null;
    }
    let notReadyForms = await notReadyFormModel.countDocuments(filterQuery);
    let registeredForms = await FormModel.countDocuments({
      ...filterQuery,
      isApproved: true
    });
    let forms = await FormModel.countDocuments({
      ...filterQuery,
      isApproved: false
    });
    return { notReadyForms, registeredForms, forms };
  }
  return { error: { message: "no user" } };
}

export async function checkIdExistence(id: string) {
  let form = await FormModel.findOne({ id: id });
  if (form) {
    return { exist: true };
  }
  return { exist: false };
}

export async function renewMember(id: string) {
  let form = await FormModel.findById(id);
  if (form) {
    if (!form.isApproved) {
      return {
        error: {
          message: "this is not an approved member and has no member id"
        }
      };
    }
    form.renewed = true;
    form.save();
    return { form, message: "member is renewed" };
  }
  return { error: { message: "member doesn't exist" } };
}

export async function downloadFormsAsExcel(query: any) {
  const { government, department, startDate, endDate } = query as {
    government: string;
    department: string;
    isApproved: string;
    startDate:string;
    endDate:string;
  };

  const departmentRegex = department
    ? { $regex: ".*" + department + ".*" }
    : { $regex: ".*" };
  const governmentRegex = government
    ? { $regex: ".*" + government + ".*" }
    : { $regex: ".*" };

  
    
    let filterQuery: any = {
      department: departmentRegex,
      government: governmentRegex,
      isApproved: true,
    };
    
    if(startDate && endDate)
    {
      filterQuery.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }


  let forms = await FormModel.find(filterQuery);

  if (forms) {
    let workbook = exportFormsToExcel(forms);
    return workbook;
  } else return { error: { message: "no registered members" } };
}

async function filterDataWithCount(
  Model: mongoose.Model<any>,
  queryFilter: any,
  pagination: any
) {
  let forms = await Model.find(queryFilter)
    .skip((pagination.page - 1) * pagination.pageSize)
    .limit(pagination.pageSize);

  let totalCounts = await Model.countDocuments(queryFilter);

  return { forms, totalCounts };
}
