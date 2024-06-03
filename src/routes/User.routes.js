import { Router } from "express";
import { resigterUser } from "../controllers/User.Controllers.js";

const router=Router();

router.route("/register").post(resigterUser);

export default router;