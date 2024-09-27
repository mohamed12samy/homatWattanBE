import { NextFunction, Request, Response } from "express";
import { findUser } from "../services/user.service";
import { Neighborhoods, UsereRoles } from "../enums/enums";

export const setQuery = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const government: string | undefined = req.query.government as string | undefined;
      const department: string | undefined = req.query.department as string | undefined;
    
      const id: string | undefined = req.query.id as string | undefined;
      const memberId: string | undefined = req.query.memberId as string | undefined;

      let governmentRegex: string = "";
      let departmentRegex: string = "";
      let idRegex: string = "";
      let memberIdRegex: string = "";

      governmentRegex = government ? ".*" + government + ".*" : ".*";
      departmentRegex = department ? ".*" + department + ".*" : ".*";
      idRegex = id ? ".*" + id + ".*" : ".*";
      memberIdRegex = memberId ? ".*" + memberId + ".*" : ".*";

      const currentUserID: string = res.locals.user._id;
      let currentUser = await findUser({ _id: currentUserID });
      if (currentUser) {
        if (currentUser.role === UsereRoles.departmentHead) {
          let markaz: string =
            Neighborhoods[currentUser.name.split(/[0-9]/)[0]][currentUser.name];
          departmentRegex = ".*" + markaz + ".*";
        } else if (currentUser.role === UsereRoles.governorator) {
          governmentRegex = ".*" + currentUser.governorate + ".*";
        }
      }
      req.custQuery = {
        governmentRegex,
        departmentRegex,
        idRegex,
        memberIdRegex
      };
      next();
    } catch (error: any) {
      res.status(500).json({ message: error?.message });
    }
  };
};

declare module "express" {
  export interface Request {
    custQuery?: {
      governmentRegex?: string;
      departmentRegex?: string;
      idRegex?: string;
      memberIdRegex?: string;
    };
  }
}
