import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/utils/globalErrorHandler';
import notFound from './app/utils/notFound';
import { mainRoutes } from './app/router/router';



const app: Application = express();


// parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use(cors())


//Set Routes
app.use('/api', mainRoutes)
app.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'Amanah Mart server is running successfully!'
    })
})


app.use(globalErrorHandler)
app.use(notFound)


export default app;
