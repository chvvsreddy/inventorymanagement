import { Router } from "express";
import {getDashboardMetrics} from "../controllers/dashboardControllar"
const router = Router();

router.get("/", getDashboardMetrics)

export default router;