import express from 'express';

import usersRouter from './routes/user';
import { PORT } from './constants/env';

const app = express();

app.listen(PORT, () => {
    console.log(`app run with port: ${PORT}`);
});
app.use(express.json());
app.use('/users', usersRouter);
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err && err.error && err.error.isJoi) {
        res.status(400).end(`Error. ${err.error.toString().replace(/\. /g, '. \n')}.`);
    } else {
        return  next(err);
    }
});

export default app;
