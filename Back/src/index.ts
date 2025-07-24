import { TEMP_UPLOAD_DIR } from './constants/index.ts';
import { initMongoDB } from './db/initMongoDB.ts';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.ts';

const bootstrap = async () => {
  await initMongoDB();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  setupServer();
};

bootstrap();
