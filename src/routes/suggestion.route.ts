import express from "express";

import { createSuggestion, deleteSuggestion, getSuggestion } from "../controllers/suggestion.controller";
const suggestionRoutes = express.Router();

suggestionRoutes.post(
  "/suggestion",
  createSuggestion
);

suggestionRoutes.get("/suggestion", getSuggestion);

suggestionRoutes.delete("/suggestion", deleteSuggestion);

export default suggestionRoutes;
