import { omit } from "lodash";
import FormModel, { Form } from "../models/form.model";
import mongoose, { FilterQuery, Model } from "mongoose";
import { findUser } from "./user.service";
import notReadyFormModel from "../models/notReadyForm.model";
import {
  Ages,
  GovernmentsMapping,
  GovernoratesCodes,
  Neighborhoods,
  UsereRoles
} from "../enums/enums";
import validate from "../middlewares/validateResource";
import { createFormSchema } from "../schemas/form.schema";
import { isAborted } from "zod";
import { Workbook } from "exceljs";
import { exportFormsToExcel } from "../../utils/excelGenerator.util";
import JSZip from "jszip";
import { generatePdfForMembers } from "../../utils/pdfProcess.util";
import axios from "axios";
import pLimit from 'p-limit';

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
      GovernoratesCodes[
        GovernmentsMapping[form.government] as keyof typeof GovernoratesCodes
      ] + "0".repeat(numberOfLeadingZeros);

    const newMemberId: string = prefix + newNumberStr;
    let formToBeUpdated = {
      ...formBody,
      isApproved: true,
      ApprovedBy: currentUser.username,
      memberId: newMemberId,
      memberIdSuffix: newNumber,
      approvedAt: new Date()
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
    let government: string = "";
    let department: string = "";

    if (currentUser.role === UsereRoles.governorator) {
      government =
        Neighborhoods[currentUser.name.split(/[0-9]/)[0]][currentUser.name];
    }

    if (currentUser.role === UsereRoles.departmentHead) {
      department =
        Neighborhoods[currentUser.name.split(/[0-9]/)[0]][currentUser.name];
    }
    console.log(
      "1",
      Neighborhoods[currentUser.name.split(/[0-9]/)[0]][currentUser.name],
      "\n 2 ",
      currentUser.name.split(/[0-9]/),
      "\n 3 ",
      currentUser.name
    );
    try {
      // Retrieve all documents
      const documents = await notReadyFormModel.find({
        department: { $regex: ".*" + department + ".*" },
        government: { $regex: ".*" + government + ".*" }
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
      console.log(sum, docCounts);
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

// export async function downloadFormsAsExcel(query: any) {
//   const {
//     government,
//     department,
//     startDate,
//     endDate,
//     religion,
//     age,
//     gender,
//     degree,
//     union,
//     election,
//     renew,
//     knew,
//     outsider,
//     field,
//   } = query as {
//     government: string;
//     department: string;
//     isApproved: string;
//     startDate: string;
//     endDate: string;
//     religion: string;
//     age: Ages;
//     gender: string;
//     degree: string;
//     union: string;
//     election: string;
//     renew: boolean;
//     knew: string;
//     outsider: string;
//     field: string;
//   };
//   const orConditions: any[] = [];
//   const departmentRegex = department
//     ? { $regex: ".*" + department + ".*" }
//     : { $regex: ".*" };
//   const governmentRegex = government
//     ? { $regex: ".*" + government + ".*" }
//     : { $regex: ".*" };

//   const religionRegex = religion
//     ? { $regex: ".*" + religion + ".*" }
//     : { $regex: ".*" };
//   const ageRegex = age ? { $regex: ".*" + age + ".*" } : { $regex: ".*" };
//   const genderRegex = gender
//     ? { $regex: ".*" + gender + ".*" }
//     : { $regex: ".*" };
//   const degreeRegex = degree
//     ? { $regex: ".*" + degree + ".*" }
//     : { $regex: ".*" };

//   let filterQuery: any = {
//     department: departmentRegex,
//     government: governmentRegex,
//     isApproved: true,
//     religion: religionRegex,
//     gender: genderRegex,
//     degree: degreeRegex,
//   };

//   const fieldRegex = field ? { $regex: ".*" + field + ".*" } : { $regex: ".*" };

//   if (union) {
//     filterQuery.union = { $regex: ".*" + union + ".*" };
//   }
//   if (election) {
//     filterQuery.election = { $regex: ".*" + election + ".*" };
//   }
//   if (knew) {
//     filterQuery.union = { $regex: ".*" + knew + ".*" };
//   }
//   if (outsider) {
//     filterQuery.union = { $regex: ".*" + outsider + ".*" };
//   }
//   if (field) {
//     filterQuery.fields = { $regex: ".*" + field + ".*" };
//   }

//   if (renew !== null && renew !== undefined) {
//     filterQuery.renew = renew;
//   }

//   if (startDate && endDate) {
//     filterQuery.approvedAt = {
//       $gte: new Date(startDate),
//       $lte: new Date(endDate),
//     };
//   }

//   if (age) {
//     let range: any = getDateRangeForAge(age);
//     if (range.startDate) {
//       filterQuery.birth_date_iso = { $gte: range.startDate };
//     }
//     if (range.endDate) {
//       filterQuery.birth_date_iso = {
//         ...filterQuery.birth_date_iso,
//         $lte: range.endDate,
//       };
//     }
//   }

//   console.log(filterQuery);
//   let forms = await FormModel.aggregate([
//     {
//       $addFields: {
//         birth_date_iso: {
//           $dateFromString: {
//             dateString: "$birth_date",
//             format: "%d/%m/%Y", // Adjust this format to match your date strings, e.g., "dd/MM/yyyy"
//           },
//         },
//       },
//     },
//     {
//       $match: filterQuery,
//     },
//     {
//       $project: {
//         birth_date_iso: 0, // Exclude the temporary field so only the original document is returned
//       },
//     },
//   ]);
//   if (forms && forms.length > 0) {
//     let workbook = await exportFormsToExcel(forms);

//     if (workbook instanceof Buffer) {
//       const zip = new JSZip();
//       zip.file("members.xlsx", workbook);
//       const imagesFolder = zip.folder("images");
//       for (const member of forms) {
//         if (member.profilePictureLink) {
//           const profilePic = await axios.get<ArrayBuffer>(
//             member.profilePictureLink,
//             { responseType: "arraybuffer" }
//           );
//           const profileBuffer: ArrayBuffer = profilePic.data;
//           imagesFolder?.file(`${member.memberId}_profile.jpg`, profileBuffer);
//         }

//         if (member.frontIDLink) {
//           const frontIDLink = await axios.get<ArrayBuffer>(member.frontIDLink, {
//             responseType: "arraybuffer",
//           });
//           const frontIdBuffer: ArrayBuffer = frontIDLink.data;
//           imagesFolder?.file(`${member.memberId}_frontID.jpg`, frontIdBuffer);
//         }

//         if (member.backIDLink) {
//           const backIDLink = await axios.get<ArrayBuffer>(member.backIDLink, {
//             responseType: "arraybuffer",
//           });
//           const backIDBuffer: ArrayBuffer = backIDLink.data;
//           imagesFolder?.file(`${member.memberId}_backID.jpg`, backIDBuffer);
//         }
//       }
//       const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
//       return zipBuffer;
//     } else return { error: { message: "internal server error" } };
//   } else return { error: { message: "no members to download" } };
// }

interface DownloadQuery {
  government?: string;
  department?: string;
  startDate?: string;
  endDate?: string;
  religion?: string;
  age?: Ages;
  gender?: string;
  degree?: string;
  union?: string;
  election?: string;
  renew?: string;
  knew?: string;
  outsider?: string;
  field?: string;
}

function isValidHttpUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
async function runAggregation(filterQuery:any, count:number)
{
  console.log(count)
  let forms : any[]=[];
  let asyncArr : any[]=[];
  const limit = pLimit(10); 
const limitNum = 5000;
  for (let i = 0; i <= count; i+=limitNum) {

    asyncArr.push(limit(() =>
      FormModel.aggregate([
        {
          $addFields: {
            birth_date_iso: {
              $dateFromString: {
                dateString: "$birth_date",
                format: "%d/%m/%Y",
                onError: null // Handle invalid dates gracefully
              }
            }
          }
        },
        {
          $match: filterQuery
        },
        {$skip:i},
        {$limit:limitNum},
        {
          $project: {
            birth_date_iso: 0
          }
        }
      ])
    ))
  }

  let asyncRes = await Promise.all(asyncArr);
  
  for await(let item of asyncRes)
  {
    forms = [...forms, ...item]
  } 
  
  return forms;
}
export async function downloadFormsAsExcel(query: DownloadQuery) {
  try {
    // Validate and sanitize query parameters
    const filterQuery = buildFilterQuery(query);

    // Execute aggregation with error handling
      let forms;
    try {
      let formsCount : number = await FormModel.countDocuments(filterQuery);
      forms = await runAggregation(filterQuery, formsCount);
      // forms = await FormModel.aggregate([
      //   {
      //     $addFields: {
      //       birth_date_iso: {
      //         $dateFromString: {
      //           dateString: "$birth_date",
      //           format: "%d/%m/%Y",
      //           onError: null // Handle invalid dates gracefully
      //         }
      //       }
      //     }
      //   },
      //   {
      //     $match: filterQuery
      //   },
      //   {
      //     $project: {
      //       birth_date_iso: 0
      //     }
      //   }
      // ]).exec().then(res=>res).catch(re=>console.log(re));
      console.log(forms.length)
    } catch (error) {
      console.error("MongoDB aggregation error:", error);
      return {
        status: 500,
        error: { message: "Database query failed" }
      };
    }

    if (!forms?.length) {
      return {
        status: 404,
        error: { message: "No members found matching the criteria" }
      };
    }

    // Generate Excel workbook
    const workbook = await exportFormsToExcel(forms);
    if (!(workbook instanceof Buffer)) {
      return {
        status: 500,
        error: { message: "Failed to generate Excel file" }
      };
    }

    // Create ZIP archive
    const zip = new JSZip();
    zip.file("members.xlsx", workbook);
    const imagesFolder = zip.folder("images");

    // Download images with proper error handling
    for (const member of forms) {
      await Promise.all([
        downloadAndAddToZip(
          member.profilePictureLink,
          `${member.memberId}_profile.jpg`,
          imagesFolder
        ),
        downloadAndAddToZip(
          member.frontIDLink,
          `${member.memberId}_frontID.jpg`,
          imagesFolder
        ),
        downloadAndAddToZip(
          member.backIDLink,
          `${member.memberId}_backID.jpg`,
          imagesFolder
        )
      ]);
    }

    return await zip.generateAsync({ type: "nodebuffer" });
  } catch (error) {
    console.error("Download forms error:", error);
    return {
      status: 500,
      error: { message: "Failed to process download request" }
    };
  }
}

async function downloadAndAddToZip(
  url: string | undefined,
  filename: string,
  folder: JSZip | null
) {
  if (!url || !isValidHttpUrl(url)) {
    //console.warn(`Skipping invalid URL for ${filename}`);
    return;
  }

  try {
    const response = await axios.get<ArrayBuffer>(url, {
      responseType: "arraybuffer",
      timeout: 5000, // 5 second timeout
      validateStatus: (status) => status === 200 // Only accept 200 OK
    });

    folder?.file(filename, response.data);
  } catch (error) {
    //@ts-ignore
    console.warn(`Failed to download ${filename}:`, error.message);
    // Continue processing other images
  }
}

function buildFilterQuery(query: DownloadQuery) {
  const {
    government,
    department,
    startDate,
    endDate,
    religion,
    age,
    gender,
    degree,
    union,
    election,
    renew,
    knew,
    outsider,
    field
  } = query;

  const filterQuery: any = {
    isApproved: true
  };

  // Helper function to add regex condition if value exists
  const addRegexCondition = (key: string, value?: string) => {
    if (value) {
      filterQuery[key] = { $regex: new RegExp(value, "i") };
    }
  };

  // Add basic filters
  addRegexCondition("department", department);
  addRegexCondition("government", government);
  addRegexCondition("religion", religion);
  addRegexCondition("gender", gender);
  addRegexCondition("degree", degree);
  addRegexCondition("union", union);
  addRegexCondition("election", election);
  addRegexCondition("knew", knew);
  addRegexCondition("fields", field);

  // Handle special cases
  if (outsider) {
    
    if(outsider === "true" )
    {
      filterQuery.outsider = { $regex: ".*" };
    }
    else if(outsider !== "false")
    {
      filterQuery.outsider = { $regex: ".*"+outsider+".*" };
    }
  }

  if (renew !== undefined) {
    filterQuery.renewed = renew === "true";
  }

  // Handle date range
  if (startDate && endDate) {
    filterQuery.approvedAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  // Handle age range
  if (age) {
    const range = getDateRangeForAge(age);
    if (range.startDate || range.endDate) {
      filterQuery.birth_date_iso = {};
      if (range.startDate) {
        filterQuery.birth_date_iso.$gte = range.startDate;
      }
      if (range.endDate) {
        filterQuery.birth_date_iso.$lte = range.endDate;
      }
    }
  }

  return filterQuery;
}

export async function getMembersCards(query: any) {
  const { government, department, startMemberId, endMemberId, startDate, endDate } = query as {
    government: string;
    department: string;
    endMemberId: number;
    startMemberId: number;
    startDate:string;
    endDate:string;
  };

  const govRegex = government ? ".*" + government + ".*" : ".*";
  const deptRegex = department ? ".*" + department + ".*" : ".*";
  
  let memberIdSuffix : any = { $exists: true }
  let approvedAt : any ={ $exists: true }
  if (startDate && endDate) {
    
    approvedAt = {
      $gte: new Date(`${startDate.split('T')[0]}T00:00:00.000Z`),
      $lte: new Date(`${endDate.split('T')[0]}T23:59:59.999Z`)
    };
  }
  console.log(approvedAt)
if(startMemberId && endMemberId)
{
  memberIdSuffix =  {
    $gte: startMemberId,
    $lte: endMemberId
  };
}
  let members = await FormModel.find({
    isApproved: true,
    government: { $regex: govRegex },
    department: { $regex: deptRegex },
    approvedAt,
    memberIdSuffix
  },{username:1, profilePictureLink:1, id:1, government:1, memberId:1, _id:0});

  if(!members || members?.length === 0)
  {
    return {error:{message:"no members found"}}
  }
  const zip = new JSZip();
  for (const member of members) {
    if (isValidHttpUrl(member.profilePictureLink)) {
      var pdfFile = await generatePdfForMembers(member);
      zip.file(pdfFile.fileName, pdfFile.content);
    }
  }
  const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
  return zipBuffer;
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

const getDateRangeForAge = (
  ageRange: Ages
): { startDate?: Date; endDate?: Date } => {
  const today = new Date();
  switch (ageRange) {
    case Ages["20-35"]:
      return {
        startDate: new Date(
          today.getFullYear() - 35,
          today.getMonth(),
          today.getDate()
        ),
        endDate: new Date(
          today.getFullYear() - 20,
          today.getMonth(),
          today.getDate()
        )
      };
    case Ages["36-45"]:
      return {
        startDate: new Date(
          today.getFullYear() - 45,
          today.getMonth(),
          today.getDate()
        ),
        endDate: new Date(
          today.getFullYear() - 36,
          today.getMonth(),
          today.getDate()
        )
      };
    case Ages["46-60"]:
      return {
        startDate: new Date(
          today.getFullYear() - 60,
          today.getMonth(),
          today.getDate()
        ),
        endDate: new Date(
          today.getFullYear() - 46,
          today.getMonth(),
          today.getDate()
        )
      };
    case Ages[">60"]:
      return {
        startDate: undefined,
        endDate: new Date(
          today.getFullYear() - 60,
          today.getMonth(),
          today.getDate()
        )
      };
    default:
      return {};
  }
};

export async function picsService(body: any) {
  let member = await FormModel.findById(body._id);
  if (member) {
    member.profilePictureLink = body.profilePictureLink
      ? body.profilePictureLink
      : member.profilePictureLink;
    member.backIDLink = body.backIDLink ? body.backIDLink : member.backIDLink;
    member.frontIDLink = body.frontIDLink
      ? body.frontIDLink
      : member.frontIDLink;
    await member.save();
  }
  return member;
}
