import { Request, Response } from "express";
import logger from "../../utils/logger.util";
import { createForm, deleteForm,  deleteNotReadyForms, updateNotReadyForm, approveForm, getNotFilledRequiredFieldsPercentage,checkIdExistence, getForms, getFormsCount, renewMember } from "../services/form.service";
import { omit } from "lodash";
import notReadyFormModel from "../models/notReadyForm.model";
import FormModel from "../models/form.model";

export async function createFormHandler(req: Request, res: Response) {
    try {
        const form = await createForm(req.body);
        return res.status(201).send(form);
    } catch (e: any) {
        logger.error(e);
        return res.status(409).send({"error":{"message":e.message}}); 
    }
}

export async function updateNotReadyFormHandler(req:Request, res:Response){
    let body = req.body;
    let result : any = await updateNotReadyForm(body);
    if(result && result.error)
    {
        return res.status(200).send(result); 
    }
    if(result != null)
        return res.status(201).send(result); 
    else return res.status(400).send({"error":{"message":"form is not valid"}});
}

export async function getFormHandler(req: Request, res: Response) {
    let query = req.query;
    let forms = await getForms(query, res.locals.user._id, FormModel, false);
    return res.send(forms);
}
export async function getRegisteredMembersHandler(req: Request, res: Response) {
    let query = req.query;
    let forms = await getForms(query, res.locals.user._id, FormModel, true);
    return res.send(forms);
}

export async function getNotReadyFormHandler(req: Request, res: Response) {
    let query = req.query;
    let forms = await getForms(query, res.locals.user._id, notReadyFormModel, null);
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

export async function approveFormHandler(req:Request, res:Response)
{
    let body = req.body;
    let approvedForm : any = await approveForm(body,res.locals.user._id);
    if(approvedForm)
    {
        if(approvedForm.error){
            return res.status(500).send(approvedForm);
        }
        return res.status(201).send(approvedForm);
    }else return res.status(500).send({"message":"form is not approved because of error"})
}

export async function getNotFilledRequiredFieldsPercentageHandler(req:Request, res:Response)
{
    let forms = await getNotFilledRequiredFieldsPercentage(res.locals.user._id);
    return res.send(forms);
}

export async function getFormsCountHandler(req:Request, res:Response)
{
    let result = await getFormsCount(res.locals.user._id, req.query);
    return res.status(200).send(result);
}

export async function checkIdExistenceHandler(req:Request, res:Response)
{
    const {id}  = req.query as { id: string };
    let result = await checkIdExistence(id);
    return res.status(200).send(result);
}


export async function renewMemberHandler(req:Request, res:Response)
{
    const {id}  = req.query as { id: string };
    let result = await renewMember(id);
    return res.status(200).send(result);
}


