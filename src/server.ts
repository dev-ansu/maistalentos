import express, { Request, Response, NextFunction} from "express";
import { router } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { privateRoutes } from "./privateRoutes";

const app = express();

app.use(express.json());
app.use(router);
app.use('/app', privateRoutes);
app.use(errorHandler); // sempre no final!

app.listen(3333, ()=>{
    console.log('SERVIDOR RODANDO')
})
