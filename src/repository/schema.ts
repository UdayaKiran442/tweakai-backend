import { index, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";


export const users = pgTable("users", {
    userId: varchar("userId", {length: 256}).primaryKey(),
    name: varchar("name", {length: 256}),
    email: varchar("email", {length: 256}).notNull().unique(),
    jobTitle: varchar("jobTitle", {length: 256}),
    phone: varchar("phone", {length: 256}),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
}, (users) => {
    return {
        usersEmailIdx: index("users_email_idx").on(users.email)
    }
})