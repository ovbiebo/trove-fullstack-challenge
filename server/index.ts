import "./config/environment";
import {configureDependencies} from "./config/dependency-injection";
import {configureLogger} from "./config/logger";

import express from 'express';
import * as http from 'http';

import cors from 'cors';
import debug from 'debug';

import {CommonRoutesConfig} from './routes/common.routes.config';

const app: express.Application = express();
configureDependencies(app);

const server: http.Server = http.createServer(app);
const port = process.env.PORT || 3333;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());
app.use(cors());

configureLogger(app);

export default server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        route.configureRoutes();
        debugLog(`Routes configured for ${route.getName()}`);
    });
    console.log(`Server running at http://localhost:${port}`);
});
