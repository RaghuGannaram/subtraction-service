import express from "express";
import subtractionController from "../controllers/subtraction.controller.js";

const router = express.Router();

router.post("/subtraction", subtractionController.subtraction);

export default router;
