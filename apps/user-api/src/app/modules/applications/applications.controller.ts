import {FastifyReply, FastifyRequest} from "fastify";
import {CreateApplicationBody} from "./applications.schemas";
import {createApplication} from "./applications.service";

export async function createapplicationHandler(request: FastifyRequest<{ Body: CreateApplicationBody }>, reply: FastifyReply) {
  const {name} = request.body

  const application = await createApplication({name});
  return {application}
}
