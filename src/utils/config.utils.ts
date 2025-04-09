/**
 * Configuration Utility Module
 * 
 * This module loads environment variables from the appropriate .env file
 * based on the current environment (development or production).
 * It exports a configuration object with essential environment variables.
 */
import * as dotenv from 'dotenv';

// Determine the current environment
const environment = process.env.NODE_ENV

// Load environment-specific configuration
if (environment === 'development') {
    // Load development environment variables
    dotenv.config({ path: '../../.env.development' });
} else {
    // Load production environment variables
    dotenv.config({ path: '../../.env.production' });
}

/**
 * Active configuration object containing essential environment variables
 * 
 * This object provides access to environment-specific configuration values
 * that are used throughout the application.
 */
export const ActiveConfig = {
    NODE_ENV: environment!,
    ENV: process.env.ENV!,
    DATABASE_URL: process.env.DATABASE_URL!,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
}
