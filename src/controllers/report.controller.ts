import {
  GovernmentReligionDto,
  MappedReligionData
} from "../constants/religionReportDtos";
import {
  FormsAgeReportDto,
  FormsDegreeReportDto,
  FormsElectionReportDto,
  FormsGenderReportDto,
  FormsKewReportDto,
  FormsTop10ReportDto,
  FormsReligionReportDto,
  FormsReportDto,
  Government,
  MappedData,
  WeeklyReportDto
} from "../constants/responses";
import {
  GovernmentsMapping,
  Governorate,
  Knew,
  Neighborhoods
} from "../enums/enums";
import FormModel from "../models/form.model";
import UserModel from "../models/user.model";
import { Request, Response } from "express";
import _ from "lodash";

export async function getReport(req: Request, res: Response) {
  try {
    let usersCount = await UserModel.countDocuments({
      governorate: { $ne: null }
    });
    let formsCount = await FormModel.countDocuments();

    return res.status(200).send({ usersCount, formsCount });
  } catch (e: any) {}
}

export async function getRegisteredReport(req: Request, res: Response) {
  try {
    const { governmentRegex, departmentRegex, renew } = req.custQuery || {};
    const query: any = {
      isApproved: true,
      government: { $exists: true, $regex: governmentRegex },
      department: { $exists: true, $regex: departmentRegex }
    };

    if (renew) {
      query.renewed = true;
    }
    const result: any = FormsReportDto;

    let data: any = await FormModel.aggregate([
      {
        $match: query
      },
      {
        $group: {
          _id: {
            government: "$government",
            department: "$department"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.government",
          districts: {
            $push: {
              department: "$_id.department",
              count: "$count"
            }
          },
          membersCount: { $sum: "$count" }
        }
      },
      {
        $group: {
          _id: null,
          governments: {
            $push: {
              government: "$_id",
              membersCount: "$membersCount",
              districts: "$districts"
            }
          },
          membersCount: { $sum: "$membersCount" }
        }
      },
      {
        $project: {
          _id: 0,
          membersCount: 1,
          governments: {
            $arrayToObject: {
              $map: {
                input: "$governments",
                as: "gov",
                in: {
                  k: "$$gov.government",
                  v: {
                    membersCount: "$$gov.membersCount",
                    districts: {
                      $arrayToObject: {
                        $map: {
                          input: "$$gov.districts",
                          as: "dist",
                          in: {
                            k: "$$dist.department",
                            v: "$$dist.count"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    ]);

    if (data.length > 0) {
      const governments: any = data[0]["governments"];
      result["membersCount"] = data[0]["membersCount"];

      for (const gov /*key */ in governments) {
        const govKey: any = GovernmentsMapping[gov];
        result["governments"][govKey]["membersCount"] =
          governments[gov]["membersCount"];
        //gov = qahera
        const districts = governments[gov]["districts"];
        for (const dist in districts) {
          const distKey: string | null = findKeyByValue(
            Neighborhoods[govKey],
            dist
          );
          if (distKey) {
            result["governments"][govKey]["districts"][distKey] =
              districts[dist];
          }
        }
      }
    }
    return res.status(200).send(result);
  } catch (e: any) {}
}

export async function getGenderReport(req: Request, res: Response) {
  try {
    const { governmentRegex, departmentRegex } = req.custQuery || {};

    let data: any = await FormModel.aggregate([
      {
        $match: {
          government: { $exists: true, $regex: governmentRegex },
          department: { $exists: true, $regex: departmentRegex }
        }
      },
      {
        $group: {
          _id: {
            government: "$government",
            department: "$department",
            gender: "$gender"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: {
            government: "$_id.government",
            department: "$_id.department"
          },
          males: {
            $sum: {
              $cond: [{ $eq: ["$_id.gender", "ذكر"] }, "$count", 0]
            }
          },
          females: {
            $sum: {
              $cond: [{ $eq: ["$_id.gender", "انثى"] }, "$count", 0]
            }
          }
        }
      },
      {
        $group: {
          _id: "$_id.government",
          males: { $sum: "$males" },
          females: { $sum: "$females" },
          districts: {
            $push: {
              name: "$_id.department",
              males: "$males",
              females: "$females"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          government: "$_id",
          males: 1,
          females: 1,
          districts: 1
        }
      }
    ]);
    const result = mapGenderData(data);
    return res.status(200).send(result);
  } catch (e: any) {}
}

export async function getReligionReport(req: Request, res: Response) {
  try {
    const { governmentRegex, departmentRegex } = req.custQuery || {};

    let data: any = await FormModel.aggregate([
      {
        $match: {
          government: { $exists: true, $regex: governmentRegex },
          department: { $exists: true, $regex: departmentRegex }
        }
      },
      {
        $group: {
          _id: {
            government: "$government",
            department: "$department",
            religion: "$religion"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: {
            government: "$_id.government",
            department: "$_id.department"
          },
          muslims: {
            $sum: {
              $cond: [{ $eq: ["$_id.religion", "مسلم"] }, "$count", 0]
            }
          },
          christians: {
            $sum: {
              $cond: [{ $eq: ["$_id.religion", "مسيحى"] }, "$count", 0]
            }
          }
        }
      },
      {
        $group: {
          _id: "$_id.government",
          muslims: { $sum: "$muslims" },
          christians: { $sum: "$christians" },
          districts: {
            $push: {
              name: "$_id.department",
              muslims: "$muslims",
              christians: "$christians"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          government: "$_id",
          muslims: 1,
          christians: 1,
          districts: 1
        }
      }
    ]);
    const result = mapReligionData(data);
    return res.status(200).send(result);
  } catch (e: any) {}
}

export async function getOutsiderReport(req: Request, res: Response) {
  try {
    const { governmentRegex, departmentRegex } = req.custQuery || {};

    let total: any = await FormModel.aggregate([
      {
        // Match only documents where "outsider" is not null
        $match: {
          outsider: { $ne: null },
          government: { $exists: true, $regex: governmentRegex },
          department: { $exists: true, $regex: departmentRegex }
        }
      },
      {
        // Group by outsider and count the occurrences
        $group: {
          _id: "$outsider",
          count: { $sum: 1 }
        }
      },
      {
        // Sort by count in descending order
        $sort: { count: -1 }
      },
      {
        // Split into two pipelines
        $facet: {
          top10: [
            { $limit: 10 },
            { $project: { _id: 0, name: "$_id", count: 1 } }
          ],
          others: [
            { $skip: 10 },
            { $group: { _id: null, count: { $sum: "$count" } } },
            { $project: { _id: 0, count: 1 } }
          ]
        }
      },
      {
        // Merge the top10 and others into a single result
        $project: {
          top10: 1,
          others: {
            $arrayElemAt: ["$others.count", 0]
          }
        }
      }
    ]);

    let data: any = await FormModel.aggregate([
      {
        // Match only documents where "outsider" is not null
        $match: {
          outsider: { $ne: null }
        }
      },
      {
        // Group by government, department, and outsider, and count occurrences
        $group: {
          _id: {
            government: "$government",
            department: "$department",
            outsider: "$outsider"
          },
          count: { $sum: 1 }
        }
      },
      {
        // Sort by the count in descending order (for top 10)
        $sort: { count: -1 }
      },
      {
        // Group by government and department, accumulating the top 10 outsiders
        $group: {
          _id: {
            government: "$_id.government",
            department: "$_id.department"
          },
          outsiders: {
            $push: {
              name: "$_id.outsider",
              count: "$count"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          government: "$_id.government",
          department: "$_id.department",
          top10: { $slice: ["$outsiders", 10] },
          othersCount: {
            $cond: {
              if: { $gt: [{ $size: "$outsiders" }, 10] },
              then: {
                $sum: {
                  $slice: ["$outsiders.count", 10, { $size: "$outsiders" }]
                }
              },
              else: 0
            }
          }
        }
      },
      {
        // Group by government, accumulate departments and top10 outsiders for the government level
        $group: {
          _id: "$government",
          departments: {
            $push: {
              name: "$department",
              top10: "$top10",
              others: { count: "$othersCount" }
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          government: "$_id",
          departments: 1
        }
      }
    ]);

    let governmentsTotal: any = await FormModel.aggregate([
      {
        $match: {
          outsider: { $ne: null }
        }
      },
      {
        $group: {
          _id: { government: "$government", outsider: "$outsider" },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.government",
          outsiders: {
            $push: { name: "$_id.outsider", count: "$count" }
          }
        }
      },

      {
        $project: {
          _id: 1,
          outsiders: {
            $slice: [
              { $sortArray: { input: "$outsiders", sortBy: { count: -1 } } },
              10
            ]
          },
          allOutsiders: "$outsiders"
        }
      },

      {
        $project: {
          _id: 1,
          top10: "$outsiders",
          others: {
            $cond: {
              if: { $gt: [{ $size: "$allOutsiders" }, 10] },
              then: {
                count: {
                  $sum: {
                    $slice: ["$allOutsiders", 1, { $size: "$allOutsiders" }]
                  }
                }
              },
              else: null
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          government: "$_id",
          top10: 1,
          others: { count: "$others.count" }
        }
      }
    ]);

    const result = mapTop10Data(data, governmentsTotal);
    //{...result, top10: [...total[0]["top10"], {name:"اخرى",count:total[0]["others"]}]}
    return res.status(200).send({
      ...result,
      top10: [
        ...total[0]["top10"],
        { name: "اخرى", count: total[0]["others"] ?? 0 }
      ]
    });
  } catch (e: any) {}
}

export async function getUnionReport(req: Request, res: Response) {
  try {
    const { governmentRegex, departmentRegex } = req.custQuery || {};

    let total: any = await FormModel.aggregate([
      {
        // Match only documents where "outsider" is not null
        $match: {
          union: { $ne: null },
          government: { $exists: true, $regex: governmentRegex },
          department: { $exists: true, $regex: departmentRegex }
        }
      },
      {
        $group: {
          _id: "$union",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $facet: {
          top10: [
            { $limit: 10 },
            { $project: { _id: 0, name: "$_id", count: 1 } }
          ],
          others: [
            { $skip: 10 },
            { $group: { _id: null, count: { $sum: "$count" } } },
            { $project: { _id: 0, count: 1 } }
          ]
        }
      },
      {
        $project: {
          top10: 1,
          others: {
            $arrayElemAt: ["$others.count", 0]
          }
        }
      }
    ]);

    let data: any = await FormModel.aggregate([
      {
        $match: {
          union: { $ne: null }
        }
      },
      {
        $group: {
          _id: {
            government: "$government",
            department: "$department",
            union: "$union"
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $group: {
          _id: {
            government: "$_id.government",
            department: "$_id.department"
          },
          unions: {
            $push: {
              name: "$_id.union",
              count: "$count"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          government: "$_id.government",
          department: "$_id.department",
          top10: { $slice: ["$unions", 10] },
          othersCount: {
            $cond: {
              if: { $gt: [{ $size: "$unions" }, 10] },
              then: {
                $sum: {
                  $slice: ["$unions.count", 10, { $size: "$unions" }]
                }
              },
              else: 0
            }
          }
        }
      },
      {
        $group: {
          _id: "$government",
          departments: {
            $push: {
              name: "$department",
              top10: "$top10",
              others: { count: "$othersCount" }
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          government: "$_id",
          departments: 1
        }
      }
    ]);

    let governmentsTotal: any = await FormModel.aggregate([
      {
        $match: {
          union: { $ne: null }
        }
      },
      {
        $group: {
          _id: { government: "$government", union: "$union" },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.government",
          unions: {
            $push: { name: "$_id.union", count: "$count" }
          }
        }
      },

      {
        $project: {
          _id: 1,
          unions: {
            $slice: [
              { $sortArray: { input: "$unions", sortBy: { count: -1 } } },
              10
            ]
          },
          allUnions: "$unions"
        }
      },

      {
        $project: {
          _id: 1,
          top10: "$unions",
          others: {
            $cond: {
              if: { $gt: [{ $size: "$allUnions" }, 10] },
              then: {
                count: {
                  $sum: {
                    $slice: ["$allUnions", 1, { $size: "$allUnions" }]
                  }
                }
              },
              else: null
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          government: "$_id",
          top10: 1,
          others: { count: "$others.count" }
        }
      }
    ]);

    const result = mapTop10Data(data, governmentsTotal);
    //{...result, top10: [...total[0]["top10"], {name:"اخرى",count:total[0]["others"]}]}
    return res.status(200).send({
      ...result,
      top10: [
        ...total[0]["top10"],
        { name: "اخرى", count: total[0]["others"] ?? 0 }
      ]
    });
  } catch (e: any) {}
}

// المشاركة الحزبية
export async function getFieldsReport(req: Request, res: Response) {
  const { governmentRegex, departmentRegex } = req.custQuery || {};
  try {
    let total: any = await FormModel.aggregate([
      {
        // Match only documents where "outsider" is not null
        $match: {
          government: { $exists: true, $regex: governmentRegex },
          department: { $exists: true, $regex: departmentRegex },

          fields: { $ne: null }
        }
      },
      {
        $group: {
          _id: "$fields",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $facet: {
          top10: [
            { $limit: 10 },
            { $project: { _id: 0, name: "$_id", count: 1 } }
          ],
          others: [
            { $skip: 10 },
            { $group: { _id: null, count: { $sum: "$count" } } },
            { $project: { _id: 0, count: 1 } }
          ]
        }
      },
      {
        $project: {
          top10: 1,
          others: {
            $arrayElemAt: ["$others.count", 0]
          }
        }
      }
    ]);

    let data: any = await FormModel.aggregate([
      {
        $match: {
          fields: { $ne: null }
        }
      },
      {
        $group: {
          _id: {
            government: "$government",
            department: "$department",
            fields: "$fields"
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $group: {
          _id: {
            government: "$_id.government",
            department: "$_id.department"
          },
          fields: {
            $push: {
              name: "$_id.fields",
              count: "$count"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          government: "$_id.government",
          department: "$_id.department",
          top10: { $slice: ["$fields", 10] },
          othersCount: {
            $cond: {
              if: { $gt: [{ $size: "$fields" }, 10] },
              then: {
                $sum: {
                  $slice: ["$fields.count", 10, { $size: "$fields" }]
                }
              },
              else: 0
            }
          }
        }
      },
      {
        $group: {
          _id: "$government",
          departments: {
            $push: {
              name: "$department",
              top10: "$top10",
              others: { count: "$othersCount" }
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          government: "$_id",
          departments: 1
        }
      }
    ]);

    let governmentsTotal: any = await FormModel.aggregate([
      {
        $match: {
          fields: { $ne: null }
        }
      },
      {
        $group: {
          _id: { government: "$government", fields: "$fields" },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.government",
          fields: {
            $push: { name: "$_id.fields", count: "$count" }
          }
        }
      },

      {
        $project: {
          _id: 1,
          fields: {
            $slice: [
              { $sortArray: { input: "$fields", sortBy: { count: -1 } } },
              10
            ]
          },
          allFields: "$fields"
        }
      },

      {
        $project: {
          _id: 1,
          top10: "$fields",
          others: {
            $cond: {
              if: { $gt: [{ $size: "$allFields" }, 10] },
              then: {
                count: {
                  $sum: {
                    $slice: ["$allFields", 1, { $size: "$allFields" }]
                  }
                }
              },
              else: null
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          government: "$_id",
          top10: 1,
          others: { count: "$others.count" }
        }
      }
    ]);

    const result = mapTop10Data(data, governmentsTotal);
    //{...result, top10: [...total[0]["top10"], {name:"اخرى",count:total[0]["others"]}]}
    return res.status(200).send({
      ...result,
      top10: [
        ...total[0]["top10"],
        { name: "اخرى", count: total[0]["others"] ?? 0 }
      ]
    });
  } catch (e: any) {}
}

export async function getAgesReport(req: Request, res: Response) {
  try {
    const { governmentRegex, departmentRegex } = req.custQuery || {};

    let data: any = await FormModel.aggregate([
      {
        $match: {
          government: { $exists: true, $regex: governmentRegex },
          department: { $exists: true, $regex: departmentRegex }
        }
      },
      {
        // Calculate the age based on birth_date
        $addFields: {
          age: {
            $subtract: [
              { $year: new Date() },
              { $year: { $dateFromString: { dateString: "$birth_date" } } }
            ]
          }
        }
      },
      {
        // Add a field to classify age into ranges
        $addFields: {
          ageRange: {
            $switch: {
              branches: [
                {
                  case: {
                    $and: [{ $gte: ["$age", 20] }, { $lte: ["$age", 35] }]
                  },
                  then: "20-35"
                },
                {
                  case: {
                    $and: [{ $gte: ["$age", 36] }, { $lte: ["$age", 45] }]
                  },
                  then: "36-45"
                },
                {
                  case: {
                    $and: [{ $gte: ["$age", 46] }, { $lte: ["$age", 60] }]
                  },
                  then: "46-60"
                },
                { case: { $gte: ["$age", 61] }, then: ">60" }
              ],
              default: "Unknown"
            }
          }
        }
      },
      {
        // Group by government, department, and age range
        $group: {
          _id: {
            government: "$government",
            district: "$department",
            ageRange: "$ageRange"
          },
          count: { $sum: 1 }
        }
      },
      {
        // Group by government and aggregate department age ranges
        $group: {
          _id: {
            government: "$_id.government",
            district: "$_id.district"
          },
          ageRanges: {
            $push: {
              k: "$_id.ageRange",
              v: "$count"
            }
          }
        }
      },
      {
        // Transform department ageRanges array into objects
        $group: {
          _id: "$_id.government",
          districts: {
            $push: {
              name: "$_id.district",
              ageRanges: { $arrayToObject: "$ageRanges" }
            }
          }
        }
      },

      {
        // Format the final output
        $project: {
          _id: 0,
          government: "$_id",
          totalAgeRanges: 1,
          districts: 1
        }
      }
    ]);

    let result = mapAgesReport(data);
    return res.status(200).send(result);
  } catch (e: any) {}
}

export async function getDegreeReport(req: Request, res: Response) {
  const { governmentRegex, departmentRegex } = req.custQuery || {};

  try {
    let result: any = await FormModel.aggregate([
      // Ensure documents with valid government, department, and degree are used
      {
        $match: {
          government: { $exists: true, $regex: governmentRegex },
          department: { $exists: true, $regex: departmentRegex },
          degree: { $exists: true, $ne: null }
        }
      },
      // Group by government and department (district), counting degrees
      {
        $group: {
          _id: {
            government: "$government",
            department: "$department",
            degree: "$degree"
          },
          count: { $sum: 1 }
        }
      },
      // Group again to organize by government and department, pushing degrees
      {
        $group: {
          _id: {
            government: "$_id.government",
            department: "$_id.department"
          },
          degrees: {
            $push: {
              name: "$_id.degree",
              count: "$count"
            }
          }
        }
      },
      // Group by government and gather all districts with their degrees
      {
        $group: {
          _id: "$_id.government",
          districts: {
            $push: {
              name: "$_id.department",
              degrees: "$degrees"
            }
          }
        }
      },
      // Final projection to structure the output
      {
        $project: {
          _id: 0,
          name: "$_id",
          districts: "$districts"
        }
      },
      // Create a facet for the degrees and governments
      {
        $facet: {
          governments: [
            {
              $project: {
                government: "$name",
                districts: "$districts"
              }
            }
          ]
        }
      }
    ]);

    let degreesCount: any = await FormModel.aggregate([
      {
        $match: {
          government: { $exists: true, $ne: null },
          department: { $exists: true, $ne: null },
          degree: { $exists: true, $ne: null }
        }
      },
      // Group by degree to get the total count of each degree across all documents
      {
        $group: {
          _id: "$degree",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count"
        }
      }
    ]);

    // let finalResult: any = { degrees: degreesCount, result };
    let finalResult = mapDegreeReport({
      degrees: degreesCount,
      result: result[0]
    });
    return res.status(200).send(finalResult);
  } catch (e: any) {}
}

export async function getElectionsReport(req: Request, res: Response) {
  const { governmentRegex, departmentRegex } = req.custQuery || {};

  try {
    let data: any = await FormModel.aggregate([
      // Match documents where `election_candidate` exists and is not empty
      {
        $match: {
          election_candidate: { $exists: true, $ne: "" },
          government: { $exists: true, $regex: governmentRegex },
          department: { $exists: true, $regex: departmentRegex }
        }
      },
      {
        $group: {
          _id: "$government",
          count: { $sum: 1 }, // Count number of documents per government
          candidates: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          _id: 0,
          government: "$_id",
          count: "$count",
          candidates: "$candidates"
        }
      }
    ]);
    let result = mapElectionReport(data);
    return res.status(200).send(result);
  } catch (e: any) {}
}

export async function getKnewReport(req: Request, res: Response) {
  const { governmentRegex, departmentRegex } = req.custQuery || {};

  try {
    let data: any = await FormModel.aggregate([
      // Match documents where `knew` is not empty
      {
        $match: {
          knew: { $exists: true, $ne: "" },
          government: { $exists: true, $regex: governmentRegex },
          department: { $exists: true, $regex: departmentRegex }
        }
      },
      // Group by government, department, and knew to count occurrences
      {
        $group: {
          _id: {
            government: "$government",
            department: "$department",
            knew: "$knew"
          },
          count: { $sum: 1 }
        }
      },
      // Group by government and department, aggregating knew counts
      {
        $group: {
          _id: {
            government: "$_id.government",
            department: "$_id.department"
          },
          knew: {
            $push: {
              name: "$_id.knew",
              count: "$count"
            }
          }
        }
      },
      // Group by government to gather all departments
      {
        $group: {
          _id: "$_id.government",
          departments: {
            $push: {
              name: "$_id.department",
              knew: "$knew"
            }
          }
        }
      },
      // Project the final structure
      {
        $project: {
          _id: 0,
          government: "$_id",
          departments: {
            $map: {
              input: "$departments",
              as: "dept",
              in: {
                name: "$$dept.name",
                knew: [
                  {
                    name: Knew.socialMedia,
                    count: {
                      $let: {
                        vars: {
                          count: {
                            $arrayElemAt: [
                              {
                                $filter: {
                                  input: "$$dept.knew",
                                  as: "k",
                                  cond: { $eq: ["$$k.name", Knew.socialMedia] }
                                }
                              },
                              0
                            ]
                          }
                        },
                        in: { $ifNull: ["$$count.count", 0] }
                      }
                    }
                  },
                  {
                    name: Knew.friends,
                    count: {
                      $let: {
                        vars: {
                          count: {
                            $arrayElemAt: [
                              {
                                $filter: {
                                  input: "$$dept.knew",
                                  as: "k",
                                  cond: { $eq: ["$$k.name", Knew.friends] }
                                }
                              },
                              0
                            ]
                          }
                        },
                        in: { $ifNull: ["$$count.count", 0] }
                      }
                    }
                  },
                  {
                    name: Knew.activities,
                    count: {
                      $let: {
                        vars: {
                          count: {
                            $arrayElemAt: [
                              {
                                $filter: {
                                  input: "$$dept.knew",
                                  as: "k",
                                  cond: { $eq: ["$$k.name", Knew.activities] }
                                }
                              },
                              0
                            ]
                          }
                        },
                        in: { $ifNull: ["$$count.count", 0] }
                      }
                    }
                  },
                  {
                    name: "اخرى",
                    count: {
                      $let: {
                        vars: {
                          count: {
                            $arrayElemAt: [
                              {
                                $filter: {
                                  input: "$$dept.knew",
                                  as: "k",
                                  cond: {
                                    $not: {
                                      $in: [
                                        "$$k.name",
                                        [
                                          Knew.socialMedia,
                                          Knew.friends,
                                          Knew.activities
                                        ]
                                      ]
                                    }
                                  }
                                }
                              },
                              0
                            ]
                          }
                        },
                        in: { $ifNull: ["$$count.count", 0] }
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      }
    ]);
    let result = mapKnewReport(data);
    return res.status(200).send(result);
  } catch (e: any) {}
}

export async function getWeeklyReport(req: Request, res: Response) {
  const { governmentRegex, departmentRegex } = req.custQuery || {};

  const weekDates = getWeekStartAndEndDates();

  let data = await FormModel.aggregate([
    // Match documents created in the last two weeks (Saturday to Friday)
    {
      $match: {
        createdAt: {
          $gte: new Date(weekDates.lastWeekStart),
          $lte: new Date(weekDates.thisWeekEnd)
        },

        government: { $exists: true, $regex: governmentRegex },
        department: { $exists: true, $regex: departmentRegex }
      }
    },
    // Group by day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    {
      $group: {
        _id: {
          dayOfWeek: { $dayOfWeek: "$createdAt" }, // Get the day of the week
          week: {
            $cond: [
              { $gte: ["$createdAt", new Date(weekDates.thisWeekStart)] },
              "this_week", // Documents from this week
              "last_week" // Documents from last week
            ]
          }
        },
        count: { $sum: 1 }
      }
    },
    // Project the day of the week and map it from 1=Sunday...7=Saturday
    {
      $project: {
        dayOfWeek: {
          $cond: {
            if: { $eq: ["$_id.dayOfWeek", 1] },
            then: "Sunday",
            else: {
              $cond: {
                if: { $eq: ["$_id.dayOfWeek", 2] },
                then: "Monday",
                else: {
                  $cond: {
                    if: { $eq: ["$_id.dayOfWeek", 3] },
                    then: "Tuesday",
                    else: {
                      $cond: {
                        if: { $eq: ["$_id.dayOfWeek", 4] },
                        then: "Wednesday",
                        else: {
                          $cond: {
                            if: { $eq: ["$_id.dayOfWeek", 5] },
                            then: "Thursday",
                            else: {
                              $cond: {
                                if: { $eq: ["$_id.dayOfWeek", 6] },
                                then: "Friday",
                                else: "Saturday"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        count: 1,
        week: "$_id.week"
      }
    },
    // Group by week (this week/last week) and return the count for each day
    {
      $group: {
        _id: "$week",
        days: {
          $push: {
            day: "$dayOfWeek",
            count: "$count"
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        week: "$_id",
        days: 1
      }
    }
  ]);
  let result = mapWeeklyReport(data);
  return res.status(200).send(result);
}

function mapGenderData(rawData: any[]): any {
  let totalMales = 0;
  let totalFemales = 0;
  let result: any = _.cloneDeep(FormsGenderReportDto);
  rawData.forEach((govData) => {
    const govKey /**qahera */ = GovernmentsMapping[govData["government"]];
    result["governments"][govKey]["males"] = govData["males"];
    result["governments"][govKey]["females"] = govData["females"];
    totalMales += govData["males"];
    totalFemales += govData["females"];

    const districts: any[] = govData["districts"];

    districts.forEach((dist) => {
      const distKey: string | null = findKeyByValue(
        Neighborhoods[govKey],
        dist["name"]
      );
      if (distKey) {
        result["governments"][govKey]["districts"][distKey]["males"] =
          dist["males"];
        result["governments"][govKey]["districts"][distKey]["females"] =
          dist["females"];
      }
    });
  });
  result["males"] = totalMales;
  result["females"] = totalFemales;
  return result;
}

function mapReligionData(rawData: any[]): any {
  let totalMuslims = 0;
  let totalChristians = 0;

  let result: any = _.cloneDeep(FormsReligionReportDto);
  rawData.forEach((govData) => {
    const govKey /**qahera */ = GovernmentsMapping[govData["government"]];
    result["governments"][govKey]["muslims"] = govData["muslims"];
    result["governments"][govKey]["christians"] = govData["christians"];
    totalMuslims += govData["muslims"];
    totalChristians += govData["christians"];

    const districts: any[] = govData["districts"];

    districts.forEach((dist) => {
      const distKey: string | null = findKeyByValue(
        Neighborhoods[govKey],
        dist["name"]
      );
      if (distKey) {
        result["governments"][govKey]["districts"][distKey]["muslims"] =
          dist["muslims"];
        result["governments"][govKey]["districts"][distKey]["christians"] =
          dist["christians"];
      }
    });
  });
  result["muslims"] = totalMuslims;
  result["christians"] = totalChristians;
  return result;
}

function mapAgesReport(rawData: any[]): any {
  let result: any = _.cloneDeep(FormsAgeReportDto);
  rawData.forEach((govData) => {
    const govKey /**qahera */ = GovernmentsMapping[govData["government"]];
    const districts: any[] = govData["districts"];
    districts.forEach((dist) => {
      const distKey: string | null = findKeyByValue(
        Neighborhoods[govKey],
        dist["name"]
      );
      if (distKey) {
        result["governments"][govKey]["districts"][distKey]["ageRanges"][
          "20-35"
        ] = dist["ageRanges"]["20-35"] ?? 0;
        result["governments"][govKey]["districts"][distKey]["ageRanges"][
          "36-45"
        ] = dist["ageRanges"]["36-45"] ?? 0;
        result["governments"][govKey]["districts"][distKey]["ageRanges"][
          "46-60"
        ] = dist["ageRanges"]["46-60"] ?? 0;
        result["governments"][govKey]["districts"][distKey]["ageRanges"][
          ">60"
        ] = dist["ageRanges"][">60"] ?? 0;

        result["governments"][govKey]["ageRanges"]["20-35"] +=
          result["governments"][govKey]["districts"][distKey]["ageRanges"][
            "20-35"
          ];
        result["governments"][govKey]["ageRanges"]["36-45"] +=
          result["governments"][govKey]["districts"][distKey]["ageRanges"][
            "36-45"
          ];
        result["governments"][govKey]["ageRanges"]["46-60"] +=
          result["governments"][govKey]["districts"][distKey]["ageRanges"][
            "46-60"
          ];
        result["governments"][govKey]["ageRanges"][">60"] +=
          result["governments"][govKey]["districts"][distKey]["ageRanges"][
            ">60"
          ];

        result["ageRanges"]["20-35"] +=
          result["governments"][govKey]["districts"][distKey]["ageRanges"][
            "20-35"
          ];
        result["ageRanges"]["36-45"] +=
          result["governments"][govKey]["districts"][distKey]["ageRanges"][
            "36-45"
          ];
        result["ageRanges"]["46-60"] +=
          result["governments"][govKey]["districts"][distKey]["ageRanges"][
            "46-60"
          ];
        result["ageRanges"][">60"] +=
          result["governments"][govKey]["districts"][distKey]["ageRanges"][
            ">60"
          ];
      }
    });
  });

  return result;
}

function mapKnewReport(rawData: any[]): any {
  let result: any = _.cloneDeep(FormsKewReportDto);

  rawData.forEach((govData) => {
    const govKey /**qahera */ = GovernmentsMapping[govData["government"]];
    const districts: any[] = govData["departments"];
    districts.forEach((dist) => {
      const distKey: string | null = findKeyByValue(
        Neighborhoods[govKey],
        dist["name"]
      );
      if (distKey) {
        result["governments"][govKey]["districts"][distKey]["knew"] =
          dist["knew"];

        result["governments"][govKey]["knew"][0]["count"] +=
          result["governments"][govKey]["districts"][distKey]["knew"][0][
            "count"
          ];
        result["governments"][govKey]["knew"][1]["count"] +=
          result["governments"][govKey]["districts"][distKey]["knew"][1][
            "count"
          ];
        result["governments"][govKey]["knew"][2]["count"] +=
          result["governments"][govKey]["districts"][distKey]["knew"][2][
            "count"
          ];
        result["governments"][govKey]["knew"][3]["count"] +=
          result["governments"][govKey]["districts"][distKey]["knew"][3][
            "count"
          ];

        result["knew"][0]["count"] +=
          result["governments"][govKey]["districts"][distKey]["knew"][0][
            "count"
          ];
        result["knew"][1]["count"] +=
          result["governments"][govKey]["districts"][distKey]["knew"][1][
            "count"
          ];
        result["knew"][2]["count"] +=
          result["governments"][govKey]["districts"][distKey]["knew"][2][
            "count"
          ];
        result["knew"][3]["count"] +=
          result["governments"][govKey]["districts"][distKey]["knew"][3][
            "count"
          ];
      }
    });
  });

  return result;
}

function mapElectionReport(rawData: any[]): any {
  let result: any = _.cloneDeep(FormsElectionReportDto);
  rawData.forEach((govData) => {
    const govKey /**qahera */ = GovernmentsMapping[govData["government"]];
    result["governments"][govKey]["count"] = govData["count"];
    result["count"] += govData["count"];
    result["governments"][govKey]["candidates"] = govData["candidates"];
  });

  return result;
}

function mapDegreeReport(rawData: any): any {
  let result: any = _.cloneDeep(FormsDegreeReportDto);
  rawData["result"]["governments"].forEach((govData: any) => {
    const govKey /**qahera */ = GovernmentsMapping[govData["government"]];
    const degreesTotal: any[] = rawData["degrees"];
    degreesTotal.forEach((degree) => {
      result["degrees"].map((item: any) => {
        item["count"] =
          item["name"] === degree["name"] ? degree["count"] : item["count"];
        return item;
      });
    });

    const districts: any[] = govData["districts"];
    districts.forEach((dist) => {
      const distKey: string | null = findKeyByValue(
        Neighborhoods[govKey],
        dist["name"]
      );
      if (distKey) {
        const degrees: any[] = dist["degrees"];
        degrees.forEach((degree) => {
          result["governments"][govKey]["districts"][distKey]["degrees"].map(
            (item: any) => {
              item["count"] =
                item["name"] === degree["name"]
                  ? degree["count"]
                  : item["count"];
              return item;
            }
          );

          result["governments"][govKey]["degrees"].map((item: any) => {
            item["count"] =
              item["name"] === degree["name"]
                ? item["count"] + degree["count"]
                : item["count"];
            return item;
          });
        });
      }
    });
  });

  return result;
}

function mapTop10Data(rawData: any[], governmentsData: any[]) {
  let result: any = _.cloneDeep(FormsTop10ReportDto);
  rawData.forEach((govData) => {
    const govKey /**qahera */ = GovernmentsMapping[govData["government"]];
    const districts: any[] = govData["departments"];
    districts.forEach((dist) => {
      const distKey: string | null = findKeyByValue(
        Neighborhoods[govKey],
        dist["name"]
      );
      if (distKey) {
        result["governments"][govKey]["districts"][distKey]["top10"] = [
          ...dist["top10"],
          { name: "اخرى", count: dist["others"].count }
        ];
      }
    });

    let governmentData = governmentsData.find(
      (x) => x["government"] === govData["government"]
    );
    if (governmentData) {
      result["governments"][govKey]["top10"] = [
        ...governmentData["top10"],
        { name: "اخرى", count: governmentData["others"].count ?? 0 }
      ];
    }
  });

  return result;
}

function mapWeeklyReport(rawData: any[]) {
  let result: any[] = _.cloneDeep(WeeklyReportDto);

  rawData.forEach((week) => {
    result.map((resWeek) => {
      if (resWeek["week"] === week["week"]) {
        let days: any[] = week["days"];
        days.forEach((day) => {
          resWeek["days"].forEach((resDay: any) => {
            if (resDay["day"] === day["day"]) {
              resDay["count"] = day["count"];
            }
            return resDay;
          });
        });
      }
      return resWeek;
    });
  });
  return result;
}

function findKeyByValue(object: any, value: any) {
  for (let key in object) {
    if (object[key] === value) {
      return key;
    }
  }
  return null;
}

function getWeekStartAndEndDates() {
  const today = new Date();

  function getPreviousSaturday(date: any) {
    const day = date.getDay();
    const diff = (day + 1) % 7;
    return new Date(date.setDate(date.getDate() - diff));
  }

  function getNextFriday(date: any) {
    const day = date.getDay();
    const diff = (5 - day + 7) % 7;
    return new Date(date.setDate(date.getDate() + diff));
  }

  const thisWeekStart = getPreviousSaturday(new Date(today));
  const thisWeekEnd = getNextFriday(new Date(today));

  const lastWeekEnd = new Date(thisWeekStart);
  const lastWeekStart = new Date(lastWeekEnd);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);

  return {
    thisWeekStart: thisWeekStart.toISOString(),
    thisWeekEnd: thisWeekEnd.toISOString(),
    lastWeekStart: lastWeekStart.toISOString(),
    lastWeekEnd: lastWeekEnd.toISOString()
  };
}

export async function getRegisteredReportData(req: Request, res: Response) {
  try {
    const { governmentRegex, departmentRegex, idRegex, memberIdRegex, renew } =
      req.custQuery || {};
    const page: number = Number(req.query.page) || 1;
    const pageSize: number = Number(req.query.pageSize) || 10;

    const query: any = {
      id: { $regex: idRegex },
      memberId: { $regex: memberIdRegex },
      isApproved: true,
      government: { $exists: true, $regex: governmentRegex },
      department: { $exists: true, $regex: departmentRegex }
    };

    if (renew) {
      query.renewed = true;
    }

    let data: any = await FormModel.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    let totalCount = await FormModel.countDocuments(query);
    return res.status(200).send({ data, totalCount });
  } catch (e: any) {}
}

export async function getGenderReportData(req: Request, res: Response) {
  try {
    const { governmentRegex, departmentRegex, idRegex, memberIdRegex } =
      req.custQuery || {};
    const page: number = Number(req.query.page) || 1; // Default to 0 if not provided
    const pageSize: number = Number(req.query.pageSize) || 10;

    let data: any = await FormModel.aggregate([
      {
        $match: {
          id: { $regex: idRegex },
          memberId: { $regex: memberIdRegex },
          government: { $exists: true, $regex: governmentRegex },
          department: { $exists: true, $regex: departmentRegex }
        }
      },
      {
        $group: {
          _id: null, // No specific grouping, so all results go in the same output
          males: {
            $push: {
              $cond: {
                if: { $eq: ["$gender", "ذكر"] },
                then: {
                  _id: "$_id",
                  username: "$username",
                  id: "$id",
                  birth_date: "$birth_date",
                  gender: "$gender",
                  religion: "$religion",
                  phoneNumber: "$phoneNumber",
                  election_candidate: "$election_candidate",
                  election_data: "$election_data",
                  department: "$department",
                  fields: "$fields",
                  degree: "$degree"
                },
                else: null
              }
            }
          },
          females: {
            $push: {
              $cond: {
                if: { $eq: ["$gender", "انثى"] },
                then: {
                  _id: "$_id",
                  username: "$username",
                  id: "$id",
                  birth_date: "$birth_date",
                  gender: "$gender",
                  religion: "$religion",
                  phoneNumber: "$phoneNumber",
                  election_candidate: "$election_candidate",
                  election_data: "$election_data",
                  department: "$department",
                  fields: "$fields",
                  degree: "$degree"
                },
                else: null
              }
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          males: {
            $filter: {
              input: "$males",
              as: "male",
              cond: { $ne: ["$$male", null] }
            }
          },
          females: {
            $filter: {
              input: "$females",
              as: "female",
              cond: { $ne: ["$$female", null] }
            }
          }
        }
      }
    ]);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    console.log(startIndex, endIndex);

    const malesCount = data[0]["males"].length;
    const femalesCount = data[0]["females"].length;
    const males = data[0]["males"].slice(startIndex, endIndex);
    const females = data[0]["females"].slice(startIndex, endIndex);

    return res.status(200).send({ males, females, malesCount, femalesCount });
  } catch (e: any) {}
}

export async function getReligionReportData(req: Request, res: Response) {
  try {
    const { governmentRegex, departmentRegex, idRegex, memberIdRegex } =
      req.custQuery || {};
    const page: number = Number(req.query.page) || 1;
    const pageSize: number = Number(req.query.pageSize) || 10;

    let data: any = await FormModel.aggregate([
      {
        $match: {
          id: { $regex: idRegex },
          memberId: { $regex: memberIdRegex },
          government: { $exists: true, $regex: governmentRegex },
          department: { $exists: true, $regex: departmentRegex }
        }
      },
      {
        $group: {
          _id: null, // No specific grouping, so all results go in the same output
          muslims: {
            $push: {
              $cond: {
                if: { $eq: ["$religion", "مسلم"] },
                then: {
                  _id: "$_id",
                  username: "$username",
                  id: "$id",
                  birth_date: "$birth_date",
                  gender: "$gender",
                  religion: "$religion",
                  phoneNumber: "$phoneNumber",
                  election_candidate: "$election_candidate",
                  election_data: "$election_data",
                  department: "$department",
                  fields: "$fields",
                  degree: "$degree"
                },
                else: null
              }
            }
          },
          christians: {
            $push: {
              $cond: {
                if: { $eq: ["$religion", "مسيحى"] },
                then: {
                  _id: "$_id",
                  username: "$username",
                  id: "$id",
                  birth_date: "$birth_date",
                  gender: "$gender",
                  religion: "$religion",
                  phoneNumber: "$phoneNumber",
                  election_candidate: "$election_candidate",
                  election_data: "$election_data",
                  department: "$department",
                  fields: "$fields",
                  degree: "$degree"
                },
                else: null
              }
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          muslims: {
            $filter: {
              input: "$muslims",
              as: "muslim",
              cond: { $ne: ["$$muslim", null] }
            }
          },
          christians: {
            $filter: {
              input: "$christians",
              as: "christian",
              cond: { $ne: ["$$christian", null] }
            }
          }
        }
      }
    ]);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    console.log(startIndex, endIndex);

    const muslimsCount = data[0]["muslims"].length;
    const christiansCount = data[0]["christians"].length;

    const muslims = data[0]["muslims"].slice(startIndex, endIndex);
    const christians = data[0]["christians"].slice(startIndex, endIndex);

    return res
      .status(200)
      .send({ muslims, christians, muslimsCount, christiansCount });
  } catch (e: any) {}
}

export async function getOutsiderReportData(req: Request, res: Response) {
  try {
    const { governmentRegex, departmentRegex, idRegex, memberIdRegex } =
      req.custQuery || {};
    const page: number = Number(req.query.page) || 1;
    const pageSize: number = Number(req.query.pageSize) || 10;

    let data: any = await FormModel.aggregate([
      {
        $match: {
          id: { $regex: idRegex },
          memberId: { $regex: memberIdRegex },
          government: { $exists: true, $regex: governmentRegex },
          department: { $exists: true, $regex: departmentRegex },
          outsider: { $ne: null }
        }
      },
      {
        $group: {
          _id: "$outsider",
          candidates: { $push: "$$ROOT" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $group: {
          _id: null,
          top10: {
            $push: {
              name: "$_id",
              candidates: "$candidates"
            }
          }
        }
      },
      {
        $project: {
          top10: { $slice: ["$top10", 10] },
          remaining: { $slice: ["$top10", 10, { $size: "$top10" }] }
        }
      },
      {
        $addFields: {
          other: {
            $cond: {
              if: { $gt: [{ $size: "$remaining" }, 0] },
              then: {
                name: "اخرى",
                candidates: {
                  $reduce: {
                    input: "$remaining.candidates",
                    initialValue: [],
                    in: { $concatArrays: ["$$value", "$$this"] }
                  }
                }
              },
              else: []
            }
          }
        }
      },
      // Merge top10 and others
      {
        $project: {
          finalResult: {
            $concatArrays: [
              "$top10",
              {
                $cond: {
                  if: { $gt: [{ $size: "$other.candidates" }, 0] },
                  then: ["$other"],
                  else: []
                }
              }
            ]
          }
        }
      },
      // Unwind to return results in the desired format
      {
        $unwind: "$finalResult"
      },
      {
        $replaceRoot: { newRoot: "$finalResult" }
      }
    ]);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    data.forEach((outsider: any) => {
      outsider["totalCount"] = outsider["candidates"].length;
      outsider["candidates"] = outsider["candidates"].slice(
        startIndex,
        endIndex
      );
    });
    return res.status(200).send(data);
  } catch (e: any) {}
}

export async function getUnionReportData(req: Request, res: Response) {
  try {
    const { governmentRegex, departmentRegex, idRegex, memberIdRegex } =
      req.custQuery || {};
    const page: number = Number(req.query.page) || 1;
    const pageSize: number = Number(req.query.pageSize) || 10;

    let data: any = await FormModel.aggregate([
      {
        $match: {
          id: { $regex: idRegex },
          memberId: { $regex: memberIdRegex },
          government: { $exists: true, $regex: governmentRegex },
          department: { $exists: true, $regex: departmentRegex },
          union: { $ne: null }
        }
      },
      {
        $group: {
          _id: "$union",
          candidates: { $push: "$$ROOT" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $group: {
          _id: null,
          top10: {
            $push: {
              name: "$_id",
              candidates: "$candidates"
            }
          }
        }
      },
      {
        $project: {
          top10: { $slice: ["$top10", 10] }, // Get the top 10 outsiders
          remaining: { $slice: ["$top10", 10, { $size: "$top10" }] } // Get the rest
        }
      },
      {
        $addFields: {
          other: {
            $cond: {
              if: { $gt: [{ $size: "$remaining" }, 0] },
              then: {
                name: "اخرى",
                candidates: {
                  $reduce: {
                    input: "$remaining.candidates",
                    initialValue: [],
                    in: { $concatArrays: ["$$value", "$$this"] }
                  }
                }
              },
              else: []
            }
          }
        }
      },
      // Merge top10 and others
      {
        $project: {
          finalResult: {
            $concatArrays: [
              "$top10",
              {
                $cond: {
                  if: { $gt: [{ $size: "$other.candidates" }, 0] },
                  then: ["$other"],
                  else: []
                }
              }
            ]
          }
        }
      },
      // Unwind to return results in the desired format
      {
        $unwind: "$finalResult"
      },
      {
        $replaceRoot: { newRoot: "$finalResult" }
      }
    ]);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    data.forEach((union: any) => {
      union["totalCount"] = union["candidates"].length;
      union["candidates"] = union["candidates"].slice(startIndex, endIndex);
    });
    return res.status(200).send(data);
  } catch (e: any) {}
}

export async function getFieldsReportData(req: Request, res: Response) {
  try {
    const { governmentRegex, departmentRegex, idRegex, memberIdRegex } =
      req.custQuery || {};
    const page: number = Number(req.query.page) || 1;
    const pageSize: number = Number(req.query.pageSize) || 10;

    let data: any = await FormModel.aggregate([
      {
        $match: {
          id: { $regex: idRegex },
          memberId: { $regex: memberIdRegex },
          government: { $exists: true, $regex: governmentRegex },
          department: { $exists: true, $regex: departmentRegex },
          fields: { $ne: null }
        }
      },
      {
        $group: {
          _id: "$fields",
          candidates: { $push: "$$ROOT" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $group: {
          _id: null,
          top10: {
            $push: {
              name: "$_id",
              candidates: "$candidates"
            }
          }
        }
      },
      {
        $project: {
          top10: { $slice: ["$top10", 10] }, // Get the top 10 outsiders
          remaining: { $slice: ["$top10", 10, { $size: "$top10" }] } // Get the rest
        }
      },
      {
        $addFields: {
          other: {
            $cond: {
              if: { $gt: [{ $size: "$remaining" }, 0] },
              then: {
                name: "اخرى",
                candidates: {
                  $reduce: {
                    input: "$remaining.candidates",
                    initialValue: [],
                    in: { $concatArrays: ["$$value", "$$this"] }
                  }
                }
              },
              else: []
            }
          }
        }
      },
      // Merge top10 and others
      {
        $project: {
          finalResult: {
            $concatArrays: [
              "$top10",
              {
                $cond: {
                  if: { $gt: [{ $size: "$other.candidates" }, 0] },
                  then: ["$other"],
                  else: []
                }
              }
            ]
          }
        }
      },
      // Unwind to return results in the desired format
      {
        $unwind: "$finalResult"
      },
      {
        $replaceRoot: { newRoot: "$finalResult" }
      }
    ]);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    data.forEach((field: any) => {
      field["totalCount"] = field["candidates"].length;
      field["candidates"] = field["candidates"].slice(startIndex, endIndex);
    });
    return res.status(200).send(data);
  } catch (e: any) {}
}

export async function getAgesReportData(req: Request, res: Response) {
  try {
    const { governmentRegex, departmentRegex, idRegex, memberIdRegex } =
      req.custQuery || {};
    const page: number = Number(req.query.page) || 1;
    const pageSize: number = Number(req.query.pageSize) || 10;

    let data: any = await FormModel.aggregate([
      {
        $match: {
          id: { $regex: idRegex },
          memberId: { $regex: memberIdRegex },
          government: { $exists: true, $regex: governmentRegex },
          department: { $exists: true, $regex: departmentRegex }
        }
      },
      {
        $addFields: {
          birthDate: { $dateFromString: { dateString: "$birth_date" } },
          currentDate: { $toDate: "$$NOW" }
        }
      },
      {
        $addFields: {
          age: {
            $divide: [
              { $subtract: ["$currentDate", "$birthDate"] },
              1000 * 60 * 60 * 24 * 365 // Convert milliseconds to years
            ]
          }
        }
      },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $lte: ["$age", 35] }, then: "20-35" },
                {
                  case: {
                    $and: [{ $gt: ["$age", 35] }, { $lte: ["$age", 45] }]
                  },
                  then: "36-45"
                },
                {
                  case: {
                    $and: [{ $gt: ["$age", 45] }, { $lte: ["$age", 60] }]
                  },
                  then: "46-60"
                }
              ],
              default: ">60"
            }
          },
          candidates: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          candidates: 1
        }
      }
    ]);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    data.forEach((age: any) => {
      age["totalCount"] = age["candidates"].length;
      age["candidates"] = age["candidates"].slice(startIndex, endIndex);
    });
    return res.status(200).send(data);
  } catch (e: any) {}
}

export async function getDegreesReportData(req: Request, res: Response) {
  try {
    const { governmentRegex, departmentRegex, idRegex, memberIdRegex } =
      req.custQuery || {};
    const page: number = Number(req.query.page) || 1;
    const pageSize: number = Number(req.query.pageSize) || 10;

    let data: any = await FormModel.aggregate([
      {
        $match: {
          id: { $regex: idRegex },
          memberId: { $regex: memberIdRegex },
          government: { $exists: true, $regex: governmentRegex },
          department: { $exists: true, $regex: departmentRegex }
        }
      },
      {
        $group: {
          _id: "$degree",
          candidates: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          candidates: 1
        }
      }
    ]);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    data.forEach((degree: any) => {
      degree["totalCount"] = degree["candidates"].length;
      degree["candidates"] = degree["candidates"].slice(startIndex, endIndex);
    });
    return res.status(200).send(data);
  } catch (e: any) {}
}

export async function getElectionsReportData(req: Request, res: Response) {
  try {
    const { governmentRegex, departmentRegex, idRegex, memberIdRegex } =
      req.custQuery || {};
    const page: number = Number(req.query.page) || 1;
    const pageSize: number = Number(req.query.pageSize) || 10;

    let data: any = await FormModel.aggregate([
      {
        $match: {
          id: { $regex: idRegex },
          memberId: { $regex: memberIdRegex },
          government: { $exists: true, $regex: governmentRegex },
          department: { $exists: true, $regex: departmentRegex },
          election_candidate: { $exists: true, $ne: "" }
        }
      },
      {
        $group: {
          _id: "$election_candidate",
          candidates: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          candidates: 1
        }
      }
    ]);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    data.forEach((election: any) => {
      election["totalCount"] = election["candidates"].length;

      election["candidates"] = election["candidates"].slice(
        startIndex,
        endIndex
      );
    });
    return res.status(200).send(data);
  } catch (e: any) {}
}

export async function getKnewReportData(req: Request, res: Response) {
  try {
    const { governmentRegex, departmentRegex, idRegex, memberIdRegex } =
      req.custQuery || {};
    const page: number = Number(req.query.page) || 1;
    const pageSize: number = Number(req.query.pageSize) || 10;

    let data: any = await FormModel.aggregate([
      {
        $match: {
          id: { $regex: idRegex },
          memberId: { $regex: memberIdRegex },
          government: { $exists: true, $regex: governmentRegex },
          department: { $exists: true, $regex: departmentRegex },
          knew: { $exists: true, $ne: "" }
        }
      },
      {
        $group: {
          _id: "$knew",
          candidates: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          candidates: 1
        }
      }
    ]);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    data.forEach((knew: any) => {
      knew["totalCount"] = knew["candidates"].length;
      knew["candidates"] = knew["candidates"].slice(startIndex, endIndex);
    });
    return res.status(200).send(data);
  } catch (e: any) {}
}
