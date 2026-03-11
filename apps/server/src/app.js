import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env.js';
import apiRoutes from './routes/index.js';
import authRoutes from './routes/authRoutes.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requireApiKey } from './middleware/requireApiKey.js';
import { requireSessionAuth } from './middleware/requireSessionAuth.js';
import { requireBrowserSession } from './middleware/requireBrowserSession.js';
import {
  renderLoginPage,
  handleLoginPage,
  renderProtectedHomePage,
  handleLogoutPage
} from './controllers/webAuthController.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientOrigin, credentials: true }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/login', renderLoginPage);
app.post('/login', handleLoginPage);
app.get('/', requireBrowserSession, renderProtectedHomePage);
app.post('/logout', requireBrowserSession, handleLogoutPage);

app.use(`${env.apiPrefix}/auth`, requireApiKey, authRoutes);
app.use('/api', requireApiKey, requireSessionAuth);
app.use(env.apiPrefix, apiRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

