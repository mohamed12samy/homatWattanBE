import { Request, Response } from "express";
import logger from "../../utils/logger.util";
import { createUser, deleteUserById, findUser, getAllUsers } from "../services/user.service";
import { omit } from "lodash";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.status(201).send(omit(user.toJSON(), "password"));
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message); // 409 means conflict  unique email validation failed
  }
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  return res.send(res.locals.user);
}

export const getAllUsersHandler = async (req:Request, res:Response)=>
{
  let query = req.query;
  let users = await getAllUsers(query, res.locals.user._id);
  return res.send(users);
}

export const deleteUserHandler = async (req:Request, res:Response) =>{

  const id = req.query.id as string;
  let user = await findUser({_id:id});
  let userDeleted = await deleteUserById(id);
  if(userDeleted){
  return res.status(201).send({message:"user deleted successfully"})
  }
}
