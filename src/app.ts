import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/mudules/users/users.route';

const app: Application = express();

/********** Middlewares **********/
//built-in parser
app.use(express.json());

//third party parser
app.use(cors());

// application routes
app.use('/api/users', userRoutes);

/********** root api endpoints **********/
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Assignment2 server is running...',
  });
});

export default app;
