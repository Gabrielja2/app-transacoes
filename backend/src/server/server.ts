import dotenv from 'dotenv';
dotenv.config();

import { App } from './app';

const PORT = Number(process.env.API_PORT) || 3001 ;

new App().start(PORT);

