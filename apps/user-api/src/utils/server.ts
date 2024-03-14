import fastify from 'fastify';
import { logger } from './logger';
import { app } from '../app/app';

// Instantiate Fastify with some config
export const buildServer = () => {
  const server = fastify({
    logger,
  });

  // Register your application as a normal plugin.
  server.register(app);

  return server;
};
