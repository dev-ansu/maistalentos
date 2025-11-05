import { Router, Request, Response } from "express"
import { authUserValidation, createUserValidation } from "./validations/user/userValidation";
import { validate } from "./middlewares/validate";
import CreateUserController from "./controllers/user/CreateUserController";
import AuthUserController from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import DetailUserController from "./controllers/user/DetailUserController";

const privateRoutes = Router();

privateRoutes.get("/me", isAuthenticated, new DetailUserController().handle);

export { privateRoutes };