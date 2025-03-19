import { index, integer, pgEnum, pgTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const templateEnum = pgEnum("template", ["seo", "linkedin", "instagram"])

export const statusEnum = pgEnum("status", ["ready to use", "processing", "ready to train", "error"])

export const typeEnum = pgEnum("type", ["input", "output"])


export const users = pgTable("users", {
    userId: varchar("userId", { length: 256 }).primaryKey(),
    name: varchar("name", { length: 256 }),
    email: varchar("email", { length: 256 }).notNull().unique(),
    jobTitle: varchar("jobTitle", { length: 256 }),
    phone: varchar("phone", { length: 256 }),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
}, (users) => {
    return {
        usersEmailIdx: index("users_email_idx").on(users.email)
    }
})

export const datasets = pgTable("datasets", {
    datasetId: varchar("datasetId", { length: 256 }).primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    userId: varchar("userId", { length: 256 }).notNull(),
    template: templateEnum().notNull(),
    description: text("description"),
    rowsCount: integer("rowsCount").default(0),
    columnsCount: integer("columnsCount").default(0),
    status: statusEnum(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
}, (datasets) => {
    return {
        datasetsIdIdx: uniqueIndex("datasets_id_idx").on(datasets.datasetId),
        datasetsUserIdIdx: index("datasets_userId_idx").on(datasets.userId)
    }
})

export const columns = pgTable("columns", {
    columnId: varchar("columnId", { length: 256 }).primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    datasetId: varchar("datasetId", { length: 256 }).notNull(),
    type: typeEnum().notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
}, (columns) => {
    return {
        columnsIdIdx: uniqueIndex("columns_id_idx").on(columns.columnId),
        columnsDatasetIdIdx: index("columns_datasetId_idx").on(columns.datasetId)
    }
})

export const rows = pgTable("rows", {
    rowId: varchar("rowId", { length: 256 }).primaryKey(),
    datasetId: varchar("datasetId", { length: 256 }).notNull(),
    columnId: varchar("columnId", { length: 256 }).notNull(),
    data: text("data").notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
}, (rows) => {
    return {
        rowsIdIdx: uniqueIndex("rows_id_idx").on(rows.rowId),
        rowsDatasetIdIdx: index("rows_datasetId_idx").on(rows.datasetId),
        rowsColumnIdIdx: index("rows_columnId_idx").on(rows.columnId)
    }
})