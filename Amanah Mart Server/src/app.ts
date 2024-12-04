import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';



const app: Application = express();


// parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use(cors())


app.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'Amanah Mart server is running successfully!'
    })
})


export default app;
