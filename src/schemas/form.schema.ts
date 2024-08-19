import { object, string, TypeOf } from "zod";

export const createFormSchema = object({
  body: object({
    username: string({required_error: "username is Required",}),
    nickname: string({ required_error: "nickname is required" }),
    id: string({ required_error: "id is required" }),
    birth_date: string({ required_error: "birth_date is required" }),
    gender: string({ required_error: "gender is required" }),
    religion: string({ required_error: "religion is required" }),
    phoneNumber: string({ required_error: "phoneNumber is required" }),
    department: string({ required_error: "department is required" }),
    sheyakha: string({ required_error: "nickname is required" }).optional(),
    outsider: string({ required_error: "nickname is required" }).optional(),
    specialization: string({ required_error: "specialization is required" }),
    degree: string({ required_error: "degree is required" }),
    highest_degree: string({ required_error: "highest_degree is required" }),
    profession: string({ required_error: "profession is required" }),
    union: string({ required_error: "union is required" }),
    work_place: string({ required_error: "work_place is required" }),
    work_sector: string({ required_error: "work_sector is required" }),
    position: string({ required_error: "position is required" }),
    fields: string({ required_error: "fields is required" }),
    party_name: string({ required_error: "party_name is required" }).optional(),
    election_candidate: string({ required_error: "election_candidate is required" }).optional(),
    election_data: string({ required_error: "election_data is required" }).optional(),
    other_data: string({ required_error: "other_data is required" }).optional(),
  }),
});