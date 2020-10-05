import express from 'express';

import config from './config';
import loaders from './loaders';

const app = express();

app.listen(config.appPort, () => {
    console.log(`app run with port: ${config.appPort}`);
});
loaders(app);

export default app;
