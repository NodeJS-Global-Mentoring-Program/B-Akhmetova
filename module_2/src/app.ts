import express from 'express';

import usersRouter from './router';


const app = express();
const port = 9000;

app.listen(port, ()=>{
    console.log(`app run with port: ${port}`)
});

app.use('/users', usersRouter);

export default app;