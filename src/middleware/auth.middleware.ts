import { Context, Next } from "hono";
import { jwtDecode } from "jwt-decode";

/**
 * Authentication middleware
 * 
 * Verifies the JWT token in the Authorization header and adds the user ID to the context
 * @param c - Hono context
 * @param next - Next function to continue the request pipeline
 * @returns Response or continues to the next middleware/handler
 */
export async function authMiddleware(c: Context, next: Next) {
    const token = c.req.header("Authorization");
    
    if (!token) {
        return c.json({ message: "Unauthorized" }, 401);
    }
    
    try {
        const decoded = jwtDecode<{ sub: string }>(token);
        // Store the user ID in the context for use in route handlers
        c.set("userId", decoded.sub);
        // Continue to the next middleware or route handler
        await next();
    } catch (error) {
        return c.json({ message: "Invalid token" }, 401);
    }
}