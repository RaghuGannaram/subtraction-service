import express from "express";
import subtractionRouter from "../../routes/subtraction.route.js";

const router = express.Router();

router.use("/", subtractionRouter);

export default router;
