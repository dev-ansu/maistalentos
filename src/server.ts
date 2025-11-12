import express from "express";
import { router } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(errorHandler); // sempre no final!

app.listen(3333, ()=>{
    console.log('SERVIDOR RODANDO')
})
