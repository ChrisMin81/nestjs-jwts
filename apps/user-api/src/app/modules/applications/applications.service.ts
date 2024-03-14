import {db} from "../../../database/drizzle";
import {applications} from "../../../database/drizzle/schema";
import {InferInsertModel, InferSelectModel} from "drizzle-orm";

export async function createApplication(data: InferInsertModel<typeof applications>) {
  const result = await db.insert(applications).values(data).returning()
  return result[0];
}

export async function getApplication(data: InferSelectModel<typeof applications>) {
  const result = await db.select({
    id: applications.id,
    name: applications.name,
    createdAt: applications.createdAt
  }).from(applications)

  return result;
}

j

