import { omit } from "lodash";
import FormModel, { Form } from "../models/form.model";
import { FilterQuery } from "mongoose";
import { findUser } from "./user.service";
import notReadyFormModel from "../models/notReadyForm.model";
import { GovernoratesCodes, Neighborhoods, UsereRoles } from "../enums/enums";
import validate from "../middlewares/validateResource";
import { createFormSchema } from "../schemas/form.schema";

export async function createForm(input: Omit<Form, "createdAt" | "updatedAt">) {
  try {
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

export async function getAllForms(
  query: FilterQuery<Form>,
  currentUserID: string
) {
  let currentUser = await findUser({ _id: currentUserID });

  if (currentUser) {
    return await FormModel.find({ governorate: currentUser.governorate });
  } else return null;
}

export async function getNotReadyForms(
  query: FilterQuery<any>,
  currentUserID: string
) {
  const { page, pageSize } = query;
  let currentUser = await findUser({ _id: currentUserID });
  if (currentUser) {
    if (currentUser.role === UsereRoles.departmentHead) {
      let markaz: string =
        Neighborhoods[currentUser.name.split(/[0-9]/)[0]][currentUser.name];
      console.log(markaz);
      let forms = await notReadyFormModel
        .find({ department: { $regex: ".*" + markaz + ".*" } })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      let totalCounts = await notReadyFormModel.countDocuments({
        department: { $regex: ".*" + markaz + ".*" }
      });
      let res = { forms, totalCounts };
      return res;
    } else {
      const { department } = query;
      if (department) {
        console.log(department);
        let forms = await notReadyFormModel
          .find({ department: { $regex: ".*" + department + ".*" } })
          .skip((page - 1) * pageSize)
          .limit(pageSize);

        let totalCounts = await notReadyFormModel.countDocuments({
          department: { $regex: ".*" + department + ".*" }
        });
        let res = { forms, totalCounts };
        return res;
      } else {
        let forms = await notReadyFormModel
          .find({
            government: { $regex: ".*" + currentUser.governorate + ".*" }
          })
          .skip((page - 1) * pageSize)
          .limit(pageSize);

        let totalCounts = await notReadyFormModel.countDocuments({
          government: { $regex: ".*" + currentUser.governorate + ".*" }
        });
        let res = { forms, totalCounts };
        return res;
      }
    }
  } else return null;
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
  let parseResult = createFormSchema.safeParse({ body: formBody });
  if (parseResult.success) {
    let formToUpdate: Form = { ...formBody };
    let form = await FormModel.create(formBody);
    if (form) {
      await notReadyFormModel.findOneAndDelete({ _id: form._id });
      return form;
    }
  } 
   return {error:{message:"validation error"}};
}

export async function approveForm(id: string, currentUserId: string) {
  let form = await FormModel.findById(id);

  if (form) {
    if (form?.isApproved)
      return { error: { message: "form is approved already" } };

    let currentUser = await findUser({ _id: currentUserId });
    if (currentUser === null || currentUser === undefined)
      return { error: { message: "user is not found" } };
    let government: string = currentUser.name.split(/[0-9]/)[0];
    let markaz: string = Neighborhoods[government][currentUser.name];

    let lastMemeber: any = await FormModel.findOne(
      {
        department: { $regex: ".*" + markaz + ".*" },
        memberIdSuffix: { $exists: true, $ne: null }
      },
      { memberIdSuffix: 1 }
    )
      .sort({ memberIdSuffix: -1 })
      .limit(1);
    console.log("__last", lastMemeber);
    form.isApproved = true;

    const newNumber: number = +lastMemeber.memberIdSuffix + 1; // For example, 1235 + 1 = 1236
    const newNumberStr: string = newNumber.toString();
    const totalLength: number = 7;
    const numberOfLeadingZeros: number = totalLength - newNumberStr.length;
    const prefix: string =
      GovernoratesCodes[government as keyof typeof GovernoratesCodes] +
      "0".repeat(numberOfLeadingZeros);
    const newMemberId: string = prefix + newNumberStr;

    console.log("___new", newMemberId);
    form.memberId = newMemberId;
    form.memberIdSuffix = newNumber;
    form.save();
    return form;
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
