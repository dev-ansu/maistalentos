import { Router, Request, Response } from "express"
import { authUserValidation, createUserValidation } from "./validations/user/userValidation";
import { validate } from "./middlewares/validate";
import CreateUserController from "./controllers/user/CreateUserController";
import AuthUserController from "./controllers/user/AuthUserController";

const router = Router();

router.post("/users", createUserValidation, validate, new CreateUserController().handle);
router.post("/session", authUserValidation, validate, new AuthUserController().handle)

router.get("/teste", async (req: Request, res: Response)=>{
    return res.json( { ok: true });
});


export { router };