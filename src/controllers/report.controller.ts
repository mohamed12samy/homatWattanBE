import {
  GovernmentReligionDto,
  MappedReligionData
} from "../constants/religionReportDtos";
import { FormsAgeReportDto, FormsGenderReportDto, FormsKewReportDto, FormsReligionReportDto, FormsReportDto, Government, MappedData } from "../constants/responses";
import {
  GovernmentsMapping,
  Governorate,
  Knew,
  Neighborhoods
} from "../enums/enums";
import FormModel from "../models/form.model";
import UserModel from "../models/user.model";
import { Request, Response } from "express";

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
    const result: any = FormsReportDto;

    let data: any = await FormModel.aggregate([
      { $match: { isApproved: true } },
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
          result["governments"][govKey]["districts"][distKey] = districts[dist];
        }
      }
    }

    return res.status(200).send(result);
  } catch (e: any) {}
}

export async function getGenderReport(req: Request, res: Response) {
  try {
    let data: any = await FormModel.aggregate([
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
    let data: any = await FormModel.aggregate([
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
    let result: any = await FormModel.aggregate([
      {
        // Match only documents where "outsider" is not null
        $match: {
          outsider: { $ne: null }
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

    const top10 = result[0].top10;
    const othersCount = result[0].others;

    const formattedResult = [...top10, { others: { count: othersCount } }];
    // const result = mapOutsidersData(data);
    return res.status(200).send(formattedResult);
  } catch (e: any) {}
}

export async function getUnionReport(req: Request, res: Response) {
  try {
    let result: any = await FormModel.aggregate([
      {
        // Match only documents where "outsider" is not null
        $match: {
          union: { $ne: null }
        }
      },
      {
        // Group by outsider and count the occurrences
        $group: {
          _id: "$union",
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

    const top10 = result[0].top10;
    const othersCount = result[0].others;

    const formattedResult = [...top10, { others: { count: othersCount } }];
    // const result = mapOutsidersData(data);
    return res.status(200).send(formattedResult);
  } catch (e: any) {}
}

// المشاركة الحزبية
export async function getFieldsReport(req: Request, res: Response) {
  try {
    let x: string = "fields";
    let result: any = await FormModel.aggregate([
      {
        // Match only documents where "outsider" is not null
        $match: {
          fields: { $ne: null }
        }
      },
      {
        // Group by outsider and count the occurrences
        $group: {
          _id: "$fields",
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

    const top10 = result[0].top10;
    const othersCount = result[0].others;

    const formattedResult = [...top10, { others: { count: othersCount } }];
    // const result = mapOutsidersData(data);
    return res.status(200).send(formattedResult);
  } catch (e: any) {}
}

export async function getAgesReport(req: Request, res: Response) {
  try {
    let data: any = await FormModel.aggregate([
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

    let result = mapAgesReport(data)
    return res.status(200).send(result);
  } catch (e: any) {}
}

export async function getDegreeReport(req: Request, res: Response) {
  try {
    let result: any = await FormModel.aggregate([
      // Ensure documents with valid government, department, and degree are used
      {
        $match: {
          government: { $exists: true, $ne: null },
          department: { $exists: true, $ne: null },
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
                name: "$name",
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

    let finalResult: any = { degrees: degreesCount, ...result[0] };
    return res.status(200).send(finalResult);
  } catch (e: any) {}
}

export async function getElectionsReport(req: Request, res: Response) {
  try {
    let result: any = await FormModel.aggregate([
      // Match documents where `election_candidate` exists and is not empty
      {
        $match: {
          election_candidate: { $exists: true, $ne: "" }
        }
      },
      // Group by `government`, and collect all candidates
      {
        $group: {
          _id: "$government",
          count: { $sum: 1 }, // Count number of documents per government
          candidates: {
            $push: {
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
            }
          }
        }
      },
      // Project the final structure, rename `_id` to `name`
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
          candidates: "$candidates"
        }
      }
    ]);

    return res.status(200).send(result);
  } catch (e: any) {}
}

export async function getKnewReport(req: Request, res: Response) {
  try {
    let data: any = await FormModel.aggregate([
      // Match documents where `knew` is not empty
      {
        $match: {
          knew: { $exists: true, $ne: "" }
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
    let result  = mapKnewReport(data);
    return res.status(200).send(result);
  } catch (e: any) {}
}

function mapGenderData(rawData: any[]): any {
    

  let totalMales = 0;
  let totalFemales = 0;
    let result  :any = FormsGenderReportDto;
    rawData.forEach((govData) => {

        const govKey /**qahera */ = GovernmentsMapping[govData["government"]]
        result["governments"][govKey]["males"] = govData["males"]
        result["governments"][govKey]["females"] = govData["females"]
        totalMales += govData["males"];
        totalFemales += govData["females"];

        const districts : any[] = govData["districts"];
        
        districts.forEach(dist => {
            const distKey : string | null = findKeyByValue(Neighborhoods[govKey], dist["name"]);
            if(distKey){
                result["governments"][govKey]["districts"][distKey]["males"] = dist["males"]
            result["governments"][govKey]["districts"][distKey]["females"] =  dist["females"]}
        });


    })
    result["males"] = totalMales;
    result["females"] = totalFemales;
return result;
   }

function mapReligionData(rawData: any[]): any {
  let totalMuslims = 0;
  let totalChristians = 0;

    let result  :any = FormsReligionReportDto;
    rawData.forEach((govData) => {

        const govKey /**qahera */ = GovernmentsMapping[govData["government"]]
        result["governments"][govKey]["muslims"] = govData["muslims"]
        result["governments"][govKey]["christians"] = govData["christians"]
        totalMuslims += govData["muslims"];
        totalChristians += govData["christians"];

        const districts : any[] = govData["districts"];
        
        districts.forEach(dist => {
            const distKey : string | null = findKeyByValue(Neighborhoods[govKey], dist["name"]);
            if(distKey){
                result["governments"][govKey]["districts"][distKey]["muslims"] = dist["muslims"]
            result["governments"][govKey]["districts"][distKey]["christians"] =  dist["christians"]}
        });


    })
    result["muslims"] = totalMuslims;
    result["christians"] = totalChristians;
return result;

//   const governments: { [key: string]: GovernmentReligionDto } = {};

//   rawData.forEach((govData) => {
//     const governmentKey = GovernmentsMapping[govData.government];
//     if (!governmentKey) return; // Skip if government not found in Neighborhoods

//     if (!governments[governmentKey]) {
//       governments[governmentKey] = {
//         muslims: 0,
//         christians: 0,
//         districts: {}
//       };
//     }

//     let govMuslims = 0;
//     let govChristians = 0;

//     govData.districts.forEach((districtData: any) => {
//       const districtKey = Object.keys(Neighborhoods[governmentKey]).find(
//         (key) => Neighborhoods[governmentKey][key] === districtData.name
//       );

//       if (districtKey) {
//         governments[governmentKey].districts[districtKey] = {
//           muslims: districtData.muslims,
//           christians: districtData.christians
//         };
//         govMuslims += districtData.muslims;
//         govChristians += districtData.christians;
//       }
//     });

//     governments[governmentKey].muslims += govMuslims;
//     governments[governmentKey].christians += govChristians;

//     totalMuslims += govData.muslims;
//     totalChristians += govData.christians;
//   });

//   return {
//     muslims: totalMuslims,
//     christians: totalChristians,
//     governments
//   };
}

function mapAgesReport(rawData:any[]) : any {
      let result  :any = FormsAgeReportDto;
      rawData.forEach((govData) => {
          const govKey /**qahera */ = GovernmentsMapping[govData["government"]]
          const districts : any[] = govData["districts"];
          districts.forEach(dist => {
              const distKey : string | null = findKeyByValue(Neighborhoods[govKey], dist["name"]);
              if(distKey){
                 
                  result["governments"][govKey]["districts"][distKey]["ageRanges"]["20-35"] = dist["ageRanges"]["20-35"] ?? 0; 
                  result["governments"][govKey]["districts"][distKey]["ageRanges"]["36-45"] = dist["ageRanges"]["36-45"] ?? 0; 
                  result["governments"][govKey]["districts"][distKey]["ageRanges"]["46-60"] = dist["ageRanges"]["46-60"] ?? 0; 
                  result["governments"][govKey]["districts"][distKey]["ageRanges"][">60"] = dist["ageRanges"][">60"] ?? 0; 

                  result["governments"][govKey]["ageRanges"]["20-35"] += result["governments"][govKey]["districts"][distKey]["ageRanges"]["20-35"];
                  result["governments"][govKey]["ageRanges"]["36-45"] += result["governments"][govKey]["districts"][distKey]["ageRanges"]["36-45"];
                  result["governments"][govKey]["ageRanges"]["46-60"] += result["governments"][govKey]["districts"][distKey]["ageRanges"]["46-60"];
                  result["governments"][govKey]["ageRanges"][">60"] += result["governments"][govKey]["districts"][distKey]["ageRanges"][">60"];
                }
       } );
      })
      
  return result;
}

function mapKnewReport(rawData:any[]) : any {
    let result  :any = FormsKewReportDto;
    rawData.forEach((govData) => {
        const govKey /**qahera */ = GovernmentsMapping[govData["government"]]
        const districts : any[] = govData["departments"];
        districts.forEach(dist => {
            const distKey : string | null = findKeyByValue(Neighborhoods[govKey], dist["name"]);
            if(distKey){
               
                result["governments"][govKey]["districts"][distKey]["knew"] = dist["knew"]

                result["governments"][govKey]["knew"][0]["count"] += result["governments"][govKey]["districts"][distKey]["knew"][0]["count"];
                result["governments"][govKey]["knew"][1]["count"] += result["governments"][govKey]["districts"][distKey]["knew"][1]["count"];
                result["governments"][govKey]["knew"][2]["count"] += result["governments"][govKey]["districts"][distKey]["knew"][2]["count"];
                result["governments"][govKey]["knew"][3]["count"] += result["governments"][govKey]["districts"][distKey]["knew"][3]["count"];
               
              }
     } );
    })
    
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
/**
   * 
   * 

 * [
      { $match: { isApproved: true } },
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
    ]
 
    // const updated = {
    //   ...result[0],
    //   governments: {
    //     ...Object.fromEntries(
    //       Object.entries(result[0].governments).map(([key, value]) => [
    //         GovernmentsMapping[key],value])
    //     )
    //   }
    // };
    // console.log(updated)
    // let result: any = await FormModel.aggregate([
    //   // Match only documents where isApproved is true
    //   {
    //     $match: {
    //       isApproved: true
    //     }
    //   },
    //   // Group by government and department (district) to count members per district
    //   {
    //     $group: {
    //       _id: {
    //         government: "$government",
    //         district: "$department"
    //       },
    //       membersCount: { $sum: 1 }
    //     }
    //   },
    //   // Restructure the result to match the required output
    //   {
    //     $group: {
    //       _id: "$_id.government",
    //       districts: {
    //         $push: {
    //           district: "$_id.district",
    //           membersCount: "$membersCount"
    //         }
    //       },
    //       membersCount: { $sum: "$membersCount" }
    //     }
    //   },
    //   // Add the total count for the entire collection
    //   {
    //     $group: {
    //       _id: null,
    //       governments: {
    //         $push: {
    //           government: "$_id",
    //           membersCount: "$membersCount",
    //           districts: "$districts"
    //         }
    //       },
    //       membersCount: { $sum: "$membersCount" }
    //     }
    //   },
    //   // Restructure the final output
    //   {
    //     $project: {
    //       _id: 0,
    //       membersCount: "$membersCount",
    //       governments: "$governments"
    //     }
    //   }
    // ]);

    // 
    let result = await FormModel.countDocuments({
        isApproved: true,
        government: {
          $regex: ".*" + Governorate["qahera"] + ".*"
        },
        department: { $regex: ".*" + Neighborhoods["qahera"]["qahera1"] + ".*" }
      });
  let data : any = Neighborhoods;
  data.membersCount = 0;
   */
