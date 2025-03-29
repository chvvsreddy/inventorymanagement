import { Router } from "express";
import {getExpensesByCategory} from  "../controllers/expenseControllar"
const router = Router()

router.get("/",getExpensesByCategory)

export default router

