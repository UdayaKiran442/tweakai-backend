/**
 * Application-wide type definitions
 */

/**
 * Variables that can be stored in the Hono context
 */
export interface AppVariables {
  /**
   * User ID extracted from the JWT token
   */
  userId: string;
}
