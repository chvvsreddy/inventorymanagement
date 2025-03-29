import { Router } from "express";
import {getUsers} from '../controllers/userControllar'
const router = Router();

router.get("/", getUsers)

export default router