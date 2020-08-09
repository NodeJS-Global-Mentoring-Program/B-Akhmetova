import express from 'express';

import usersRouter from './router';

const app = express();
const port = 9000;

app.listen(port, () => {
    console.log(`app run with port: ${port}`)
});
app.use(express.json());
app.use('/users', usersRouter);
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err && err.error && err.error.isJoi) {
        res.status(400).json({
          type: err.type,
          message: err.error.toString()
        });
      } else {
        next(err);
      }
})

export default app;