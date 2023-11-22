import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.json({
    greet: 'Hello World',
  });
});

export default app;
