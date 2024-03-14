import {drizzle} from 'drizzle-orm/node-postgres';
import {Pool} from 'pg';
import {env} from '../../config/env';

// Disable prefetch as it is not supported for "Transaction" pool mode
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  // ssl: true,
});

export const db = drizzle(pool);
