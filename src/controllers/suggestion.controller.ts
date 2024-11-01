import { Request, Response } from "express";
import SuggestionModel from "../models/sugesstion.model";
import FormModel from "../models/form.model";

export async function createSuggestion(req: Request, res: Response) {
  try {
    let member = await FormModel.findOne({ memberId: req.body.memberId });
    if (member) {
      let suggestion = await SuggestionModel.create(req.body);
      if (suggestion) {
        return res.status(201).send({ suggestion });
      }
    }
    else{
        return res
      .status(400)
      .send({ error: { message: `member with member id : ${req.body.memberId} not found` } });
    }
    return res
      .status(400)
      .send({ error: { message: "Error while saving suggestion" } });
  } catch (e: any) {
    return res
      .status(400)
      .send({ error: { message: "Error while saving suggestion" } });
  }
}

export async function getSuggestion(req: Request, res: Response) {
  try {
    let suggestions = await SuggestionModel.find();
    if (suggestions) {
      return res.status(200).send({ suggestions });
    }
    return res
      .status(400)
      .send({ error: { message: "Error while retrieving suggestions" } });
  } catch (e: any) {
    return res
      .status(400)
      .send({ error: { message: "Error while retrieving suggestions" } });
  }
}

export async function deleteSuggestion(req: Request, res: Response) {
  try {
    let id = req.query.id as string;
    let suggestion = await SuggestionModel.findById(id);
    if (suggestion) {
      let result = await SuggestionModel.deleteOne({ _id: id });
      if (result) return res.status(201).send({ suggestion });
    }
    return res
      .status(400)
      .send({ error: { message: "Error while deleting suggestion" } });
  } catch (e: any) {
    return res
      .status(400)
      .send({ error: { message: "Error while deleting suggestion" } });
  }
}
