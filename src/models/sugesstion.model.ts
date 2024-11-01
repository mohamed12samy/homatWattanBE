import mongoose from "mongoose";

export interface Suggestion extends mongoose.Document {
  _id:string;
  name: string;
  phoneNumber: string;
  memberId: string;
  message:string;
  createdAt: Date;
  updatedAt: Date;
}

const suggestionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String },
    message: { type: String },
    memberId:{type:String}
  },
  {
    timestamps: true,
  }
);


const SuggestionModel = mongoose.model<Suggestion>("Suggestion", suggestionSchema);

export default SuggestionModel;
