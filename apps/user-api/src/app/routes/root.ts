import {FastifyInstance} from 'fastify';
import {applicationRoutes} from "../modules/applications/applications.routes";

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async function () {
    return {message: 'Hello API'};
  });
  await applicationRoutes(fastify)
}

