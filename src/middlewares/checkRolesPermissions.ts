import { AccessControl } from "accesscontrol";
import { NextFunction, Request, Response } from "express";
import { Governorate } from "../enums/enums";

const superAdmin = {
  forms: {
    "read:any": ["*"],
    "create:any": ["*"],
    "delete:any": ["*"],
    "update:any": ["*"]
  },
  users:{
    "read:any": ["*"],
    "create:any": ["*"],
    "delete:any": ["*"],
    "update:any": ["*"]
    },
    reports:{
    "read:any": ["*"],
    }
};
const governorator = {
  forms: {
    "read:any": ["*"],
    "delete:any": ["*"],
    "update:any": ["*"],
  }, 
}
const departmentHead = {
  forms: {
    "read:any": ["*"],
    "delete:any": ["*"],
    "update:any": ["*"]
  }, 
}
const adminViewer = {
  forms: {
    "read:any": ["*"],
  },
  users:{
    "read:any": ["*"],
    },
    reports:{
    "read:any": ["*"],
    }
}
let grantObjects = {
  admin:superAdmin,
  governorator,
  departmentHead,
  adminViewer
};
const ac = new AccessControl(grantObjects);

export const checkPermission = (action: string, resource: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const role = res.locals.user.role;
      const permission = ac.permission({
        role,
        action,
        resource
      });

      if (permission.granted) {
        next();
      } else {
        res
          .status(403)
          .json({ message: "You are not authorized for this operation" });
      }
    } catch (error:any) {
      res.status(500).json({ message: error?.message });
    }
  };
};
