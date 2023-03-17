import { Router } from "express";
import { signIn } from "../controllers/signInControllers.js";
import { signOut } from "../controllers/signOut.controller.js";
import { getCart, updateCart } from "../controllers/users.controller.js";
import { signInValidation } from "../middlewares/signInMiddlewares.js";
import { signUp } from "../controllers/signUp.js";

const router = Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signInValidation, signIn);
router.put("/cart", updateCart);
router.get("/cart", getCart);
router.delete("/sign-out", signOut);

export default router;