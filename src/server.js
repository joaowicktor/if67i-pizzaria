import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { logger } from './utils/logger.js';
import database from './database/index.js';
import usersRoutes from './routes/users.routes.js';
import { errorHandlerMiddleware } from './middlewares/errorHandler.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRoutes);

app.use(errorHandlerMiddleware);

app.listen(PORT, async () => {
  logger.info(`Server running on port ${PORT}`);
  await database.connect();
});
