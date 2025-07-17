import { initMongoDB } from './db/initMongoDB.ts';
import { setupServer } from './server.js';

const bootstrap = async () => {
  await initMongoDB();
  setupServer();
};

bootstrap();
