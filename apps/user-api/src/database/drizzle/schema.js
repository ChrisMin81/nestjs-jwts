"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applications = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
exports.applications = (0, pg_core_1.pgTable)('applications', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
}, function (applications) {
    return {};
});
