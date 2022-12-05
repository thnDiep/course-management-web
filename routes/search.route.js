import express from "express";

import searchController from "../controllers/SearchController.js";
const router = express.Router();

router.get("/", searchController.index);

export default router;
