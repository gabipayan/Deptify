import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    user: 'postgres',         
    host: 'localhost',                
    database: 'DEPTIFY_db',           
    password: '6431postgres',
  port: 5432, //This is the default port for PostgreSQL
});

export default pool;