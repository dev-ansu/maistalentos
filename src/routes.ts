import { Router, Request, Response } from "express"
import { authUserValidation, createUserValidation } from "./validations/user/userValidation";
import { validate } from "./middlewares/validate";
import CreateUserController from "./controllers/user/CreateUserController";
import AuthUserController from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { updateCandidateValidation } from "./validations/candidate/candidateValidation";
import DetailUserController from "./controllers/user/DetailUserController";
import UpdateCandidateController from "./controllers/candidate/UpdateCandidateController";
import CreateStateController from "./controllers/state/CreateStateController";
import DeleteStateController from "./controllers/state/DeleteStateController";
import CreateCityController from "./controllers/city/CreateCityController";
import { isSuperAdmin } from "./middlewares/isSuperAdmin";
import { createCityValidation, listCityByStateIdValidation } from "./validations/city/cityValidation";
import { createStateValidation, deleteStateValidation, listStateValidation } from "./validations/state/stateValidation";
import UpdateStateController from "./controllers/state/UpdateStateController";
import ListStateController from "./controllers/state/ListStateController";
import ListCitiesByStateIdController from "./controllers/city/ListCitiesByStateIdController";

const router = Router();

router.post("/users", createUserValidation, validate, new CreateUserController().handle);
router.post("/session", authUserValidation, validate, new AuthUserController().handle)


router.get("/me", isAuthenticated, new DetailUserController().handle);
router.post("/candidate", isAuthenticated, updateCandidateValidation, validate, new UpdateCandidateController().handle);


// INÍCIO DAS ROTAS DE ESTADO \\
    
    router.get("/state{/:search}", isAuthenticated, listStateValidation, validate, new ListStateController().handle);
    router.post("/state", isAuthenticated, isSuperAdmin, createStateValidation, validate, new CreateStateController().handle);
    router.delete("/state/:id", isAuthenticated, isSuperAdmin, deleteStateValidation, validate, new DeleteStateController().handle);
    router.put("/state/:id", isAuthenticated, isSuperAdmin, deleteStateValidation, validate, new UpdateStateController().handle);

// FIM DAS ROTAS DE ESTADO \\

// INÍCIO DAS ROTAS DE CIDADES \\
    router.get("/city/state/:stateId", isAuthenticated, listCityByStateIdValidation, validate, new ListCitiesByStateIdController().handle)
    router.get("/city{/:search}", isAuthenticated, listCityByStateIdValidation, validate, new ListCitiesByStateIdController().handle)
    router.post("/city", isAuthenticated, isSuperAdmin, createCityValidation, validate, new CreateCityController().handle);
// FIM DAS ROTAS DE CIDADES \\

router.get("/teste", async (req: Request, res: Response)=>{
    return res.json( { ok: true });
});




export { router };