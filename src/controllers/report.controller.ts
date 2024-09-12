import { GovernmentReligionDto, MappedReligionData } from "../constants/religionReportDtos";
import { FormsReportDto, Government, MappedData } from "../constants/responses";
import { GovernmentsMapping, Governorate, Neighborhoods } from "../enums/enums";
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
   const data : any = FormsReportDto;

    for (const gov /*key */ in Neighborhoods) {
      if (Neighborhoods.hasOwnProperty(gov)) {
        const value = Neighborhoods[gov];
        for (const dist in value) {
          let result = await FormModel.countDocuments({
            isApproved: true,
            government: {
              $regex: ".*" + Governorate[gov as keyof typeof Governorate] + ".*"
            },
            department: { $regex: ".*" + Neighborhoods[gov][dist] + ".*" }
          });
          if (result > 0) {
            data["governments"][gov]["districts"][dist] = result;
            data["governments"][gov]["membersCount"] += result;
            data["membersCount"] += result;
          }
        }

        // Log the current key and value
      }
    }

    return res.status(200).send(data);
  } catch (e: any) {}
}

export async function getGenderReport(req:Request, res:Response)
{
    try {
        let data : any = await FormModel.aggregate([
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
                districts:1
                
              }
            }
          ]
          );
     const result = mapGenderData(data);
         return res.status(200).send(result);
       } catch (e: any) {}
}


export async function getReligionReport(req:Request, res:Response)
{
    try {
        let data : any = await FormModel.aggregate([
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
                districts:1
                
              }
            }
          ]
          );
     const result = mapReligionData(data);
         return res.status(200).send(result);
       } catch (e: any) {}
}


export async function getOutsiderReport(req:Request, res:Response)
{
    try {
        let data : any = await FormModel.aggregate([
            {
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
              $group: {
                _id: {
                  government: "$_id.government",
                  department: "$_id.department"
                },
                outsiders: {
                  $sum: {
                    $cond: [ { $ifNull: ["$_id.outsider", false] }, "$count", 0]
                  }
                }
              }
            },
            {
              $group: {
                _id: "$_id.government",
                outsiders: { $sum: "$outsiders" },
                districts: {
                  $push: {
                    name: "$_id.department",
                    outsiders: "$outsiders"
                  }
                }
              }
            },
            {
              $project: {
                _id: 0,
                government: "$_id",
                outsiders: 1,
                districts:1
                
              }
            }
          ]
          );
     const result = mapOutsidersData(data);
         return res.status(200).send(result);
       } catch (e: any) {}
}


function mapGenderData(rawData: any[]): MappedData {
    let totalMales = 0;
    let totalFemales = 0;
    const governments: { [key: string]: Government } = {};
  
    rawData.forEach((govData) => {
      const governmentKey  = GovernmentsMapping[govData.government]
      if (!governmentKey) return; // Skip if government not found in Neighborhoods
      
      if (!governments[governmentKey]) {
        governments[governmentKey] = {
          males: 0,
          females: 0,
          districts: {},
        };
      }
  
      let govMales = 0;
      let govFemales = 0;
  
      govData.districts.forEach((districtData: any) => {
        const districtKey = Object.keys(Neighborhoods[governmentKey]).find(
          (key) => Neighborhoods[governmentKey][key] === districtData.name
        );
        
        if (districtKey) {
          governments[governmentKey].districts[districtKey] = {
            males: districtData.males,
            females: districtData.females,
          };
          govMales += districtData.males;
          govFemales += districtData.females;
        }
      });
  
      governments[governmentKey].males += govMales;
      governments[governmentKey].females += govFemales;
  
      totalMales += govData.males;
      totalFemales += govData.females;
    });
  
    return {
      males: totalMales,
      females: totalFemales,
      governments,
    };
  }

  function mapReligionData(rawData: any[]): MappedReligionData {
    let totalMuslims = 0;
    let totalChristians = 0;
    const governments: { [key: string]: GovernmentReligionDto } = {};
  
    rawData.forEach((govData) => {
      const governmentKey  = GovernmentsMapping[govData.government]
      if (!governmentKey) return; // Skip if government not found in Neighborhoods
      
      if (!governments[governmentKey]) {
        governments[governmentKey] = {
            muslims: 0,
            christians: 0,
          districts: {},
        };
      }
  
      let govMuslims = 0;
      let govChristians = 0;
  
      govData.districts.forEach((districtData: any) => {
        const districtKey = Object.keys(Neighborhoods[governmentKey]).find(
          (key) => Neighborhoods[governmentKey][key] === districtData.name
        );
        
        if (districtKey) {
          governments[governmentKey].districts[districtKey] = {
            muslims: districtData.muslims,
            christians: districtData.christians,
          };
          govMuslims += districtData.muslims;
          govChristians += districtData.christians;
        }
      });
  
      governments[governmentKey].muslims += govMuslims;
      governments[governmentKey].christians += govChristians;
  
      totalMuslims += govData.muslims;
      totalChristians += govData.christians;
    });
  
    return {
        muslims: totalMuslims,
        christians: totalChristians,
      governments,
    };
  }


  function mapOutsidersData(rawData: any[]): any {
    let totalOutsiders = 0;

    const governments: { [key: string]: any } = {};
  
    rawData.forEach((govData) => {
      const governmentKey  = GovernmentsMapping[govData.government]
      if (!governmentKey) return; // Skip if government not found in Neighborhoods
      
      if (!governments[governmentKey]) {
        governments[governmentKey] = {
            outsiders: 0,
          districts: {},
        };
      }
  
      let govOutsiders = 0;
  
      govData.districts.forEach((districtData: any) => {
        const districtKey = Object.keys(Neighborhoods[governmentKey]).find(
          (key) => Neighborhoods[governmentKey][key] === districtData.name
        );
        
        if (districtKey) {
          governments[governmentKey].districts[districtKey] = {
            outsiders: districtData.outsiders,
          };
          govOutsiders += districtData.outsiders;
        }
      });
  
      governments[governmentKey].outsiders += govOutsiders;
  
      totalOutsiders += govData.outsiders;
    });
  
    return {
        outsiders: totalOutsiders,
      governments,
    };
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
