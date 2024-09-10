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
    console.log("first");
    let result: any = await FormModel.aggregate([
        // Match only documents where isApproved is true
        {
          $match: {
            isApproved: true
          }
        },
        // Group by government and department (district) to count members per district
        {
          $group: {
            _id: {
              government: "$government",
              district: "$department"
            },
            membersCount: { $sum: 1 }
          }
        },
        // Restructure the result to match the required output
        {
          $group: {
            _id: "$_id.government",
            districts: {
              $push: {
                district: "$_id.district",
                membersCount: "$membersCount"
              }
            },
            membersCount: { $sum: "$membersCount" }
          }
        },
        // Add the total count for the entire collection
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
        // Restructure the final output
        {
          $project: {
            _id: 0,
            membersCount: "$membersCount",
            governments: "$governments"
          }
        }
      ]);
/**
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
 */
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

    return res.send(result);
  } catch (e: any) {}
}
