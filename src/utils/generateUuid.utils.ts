/**
 * UUID Generation Utility
 * 
 * This module provides a function to generate universally unique identifiers (UUIDs).
 * UUIDs are used throughout the application to create unique identifiers for database records.
 */
import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a random UUID v4
 * 
 * @returns A string containing a randomly generated UUID
 * @example
 * // Returns something like "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
 * const id = generateUuid();
 */
export function generateUuid(){
    return uuidv4();
}