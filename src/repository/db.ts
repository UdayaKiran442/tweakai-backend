import { neon } from "@neondatabase/serverless";
import { ActiveConfig } from "../utils/config.utils";
import { drizzle } from "drizzle-orm/neon-http";


const sql = neon(ActiveConfig.DATABASE_URL);
const db = drizzle(sql);

export default db;