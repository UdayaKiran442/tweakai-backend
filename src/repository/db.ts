/**
 * Database Connection Module
 * 
 * This module establishes a connection to the Neon PostgreSQL database using Drizzle ORM.
 * It exports a singleton database instance that can be used throughout the application.
 */
import { neon } from "@neondatabase/serverless";
import { ActiveConfig } from "../utils/config.utils";
import { drizzle } from "drizzle-orm/neon-http";

// Create a SQL connection to the Neon serverless Postgres database
const sql = neon(ActiveConfig.DATABASE_URL);

// Initialize Drizzle ORM with the SQL connection
const db = drizzle(sql);

export default db;