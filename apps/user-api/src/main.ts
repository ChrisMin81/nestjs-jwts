import { buildServer } from './utils/server';

const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

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
  const app = await server.listen({ port, host }, (err) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
  });

  const signals = ['SIGINT', 'SIGTER'];

  for (const signal of signals) {
    process.on(signal, (app) => {
      gracefulShutdown({ app });
    });
  }
}

main();
