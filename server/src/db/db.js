import { Pool } from 'pg';

const isSslRequired = process.env.PGSSLMODE === 'require'
    || process.env.DATABASE_URL?.includes('sslmode=require');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl: isSslRequired
        ? { rejectUnauthorized: false }
        : false
});

export default pool;