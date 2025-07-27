import express from 'express';
import { pinoHttp } from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs.ts';
import type { NextFunction, Request, Response } from 'express';

const PORT = +getEnvVar('PORT');

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use('/api/api-docs', swaggerDocs());

  // app.use(
  //   pinoHttp({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.use('/api', router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(
      `Server is running on port ${PORT}\nSwagger url: http://localhost:3000/api/api-docs/`,
    );
  });
};
