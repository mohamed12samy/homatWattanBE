import { Request, Response } from "express";
import logger from "../../utils/logger.util";
import { createForm, deleteForm, getAllForms, getNotReadyForms, deleteNotReadyForms, updateNotReadyForm } from "../services/form.service";
import { omit } from "lodash";

export async function createFormHandler(req: Request, res: Response) {
    try {
        const user = await createForm(req.body);
        return res.status(201).send(omit(user.toJSON(), "password"));
    } catch (e: any) {
        logger.error(e);
        return res.status(409).send(e.message); 
    }
}

export async function updateNotReadyFormHandler(req:Request, res:Response){
    let body = req.body;
    let result = updateNotReadyForm(body);
    if(result != null)
        return res.status(201).send(result); 
    else return res.status(400).send({"message":"form is not valid"});
}

export async function getFormHandler(req: Request, res: Response) {
    let query = req.query;
    let forms = await getAllForms(query, res.locals.user._id);
    return res.send(forms);
}

export async function getNotReadyFormHandler(req: Request, res: Response) {
    let query = req.query;
    let forms = await getNotReadyForms(query, res.locals.user._id);
    return res.send(forms);
}

export async function deleteFormHandler(req:Request, res:Response)
{
    let query = req.query.id as string;
    let form = await deleteForm(query);
    return res.send(form);
}

export async function deleteNotReadyFormHandler(req:Request, res:Response)
{
    let query = req.query.id as string;
    let form = await deleteNotReadyForms(query);
    return res.send(form);
}