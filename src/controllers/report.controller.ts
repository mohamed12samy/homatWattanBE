import FormModel from "../models/form.model";
import UserModel from "../models/user.model";
import { Request, Response } from "express";

export async function getReport(req: Request, res: Response) {
    try {

       let usersCount = await UserModel.countDocuments({governorate:{ $ne: null }});
        let formsCount = await FormModel.countDocuments();

        return res.status(200).send({usersCount, formsCount});

    } catch (e: any) {
       
    }
}