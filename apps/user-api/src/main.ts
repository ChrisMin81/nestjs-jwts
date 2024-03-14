import {buildServer} from './utils/server';
import {env} from './config/env';
import {logger} from './utils/logger';
import {migrate} from 'drizzle-orm/node-postgres/migrator';
import {db} from "./database/drizzle";

const host = env.HOST ?? '0.0.0.0';
const port = env.PORT ? Number(env.PORT) : 3000;

async function gracefulShutdown({
                                  app,
                                }: {
  app: Awaited<ReturnType<typeof buildServer>>;
}) {
  await app.close();
}

async function main() {
  // Instantiate Fastify with some config
  const server = await buildServer();
  // Start listening.
  const app = await server.listen({port, host}, (err) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
  });
  logger.info('migration starts...');
  await migrate(db, {migrationsFolder: './migrations'});
  logger.info('migration finished...');

  logger.debug(env, 'using env');
  const signals = ['SIGINT', 'SIGTER'];

  for (const signal of signals) {
    process.on(signal, (app) => {
      gracefulShutdown({app});
    });
  }
}

main();
