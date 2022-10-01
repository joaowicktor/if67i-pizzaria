import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import database from './database/index.js';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware.js';
import routes from './routes/index.js';
import { logger } from './utils/logger.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(errorHandlerMiddleware);

app.listen(PORT, async () => {
  logger.info(`Server running on port ${PORT}`);
  await database.connect();
});
