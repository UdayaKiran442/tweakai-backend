/**
 * Database Schema Module
 *
 * This module defines the database schema using Drizzle ORM.
 * It contains table definitions, relationships, and type definitions for the application.
 */
import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Enum for dataset templates
 * Defines the different types of templates available for datasets
 */
export const templateEnum = pgEnum("template", [
  "seo",
  "linkedin",
  "instagram",
  "resume",
]);

export type ITemplateEnum = "seo" | "linkedin" | "instagram" | "resume";

/**
 * Enum for dataset processing status
 * Tracks the current state of a dataset in the processing pipeline
 */
export const statusEnum = pgEnum("status", [
  "ready to use",
  "processing",
  "ready to train",
  "error",
]);

/**
 * Enum for column types
 * Distinguishes between input columns (user-provided data) and output columns (AI-generated data)
 */
export const typeEnum = pgEnum("type", ["input", "output"]);

/**
 * Enum for model training status
 * Tracks the current state of a model in the training pipeline
 */
export const modelStatusEnum = pgEnum("modelStatus", [
  "pending",
  "succeeded",
  "failed",
]);

export type IModelStatusEnum = "pending" | "succeeded" | "failed";

/**
 * Users table
 * Stores user account information and profile details
 */
export const users = pgTable(
  "users",
  {
    userId: varchar("userId", { length: 256 }).primaryKey(),
    name: varchar("name", { length: 256 }),
    email: varchar("email", { length: 256 }).notNull().unique(),
    jobTitle: varchar("jobTitle", { length: 256 }),
    phone: varchar("phone", { length: 256 }),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },
  (users) => {
    return {
      usersEmailIdx: index("users_email_idx").on(users.email),
    };
  }
);

/**
 * Datasets table
 * Stores metadata about datasets created by users
 * Each dataset contains multiple rows and columns
 */
export const datasets = pgTable(
  "datasets",
  {
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
  },
  (datasets) => {
    return {
      datasetsIdIdx: uniqueIndex("datasets_id_idx").on(datasets.datasetId),
      datasetsUserIdIdx: index("datasets_userId_idx").on(datasets.userId),
    };
  }
);

/**
 * Columns table
 * Defines the structure of datasets by specifying column names and types
 * Each column belongs to a specific dataset
 */
export const columns = pgTable(
  "columns",
  {
    columnId: varchar("columnId", { length: 256 }).primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    datasetId: varchar("datasetId", { length: 256 }).notNull(),
    type: typeEnum().notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },
  (columns) => {
    return {
      columnsIdIdx: uniqueIndex("columns_id_idx").on(columns.columnId),
      columnsDatasetIdIdx: index("columns_datasetId_idx").on(columns.datasetId),
    };
  }
);

/**
 * Rows table
 * Represents individual data entries within a dataset
 * Each row contains multiple row items (cell values)
 */
export const rows = pgTable(
  "rows",
  {
    rowId: varchar("rowId", { length: 256 }).primaryKey(),
    datasetId: varchar("datasetId", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },
  (rows) => {
    return {
      rowsIdIdx: uniqueIndex("rows_id_idx").on(rows.rowId),
      rowsDatasetIdIdx: index("rows_datasetId_idx").on(rows.datasetId),
    };
  }
);

/**
 * Row Items table
 * Stores the actual data values (cells) for each row
 * Each row item represents a single cell value at the intersection of a row and column
 */
export const rowItems = pgTable(
  "row_items",
  {
    rowItemId: varchar("rowItemId", { length: 256 }).primaryKey(),
    rowId: varchar("rowId", { length: 256 }).notNull(),
    columnId: varchar("columnId", { length: 256 }).notNull(),
    data: text("data").notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },
  (rowItems) => {
    return {
      rowItemsIdIdx: uniqueIndex("row_items_id_idx").on(rowItems.rowItemId),
      rowItemsRowIdIdx: index("row_items_rowId_idx").on(rowItems.rowId),
      rowItemsColumnIdIdx: index("row_items_columnId_idx").on(
        rowItems.columnId
      ),
    };
  }
);

/**
 * Model table
 * Stores metadata about models created by users
 * Each model is associated with a dataset and has a name and template
 */
export const model = pgTable(
  "model",
  {
    modelId: varchar("modelId", { length: 256 }).primaryKey(),
    userId: varchar("userId", { length: 256 }).notNull(),
    datasetId: varchar("datasetId", { length: 256 }).notNull(),
    jobId: varchar("jobId", { length: 256 }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    finetunedModel: varchar("finetunedModel", { length: 256 }),
    template: templateEnum().notNull(),
    status: modelStatusEnum().notNull(),
    description: text("description"),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },
  (model) => {
    return {
      modelIdIdx: uniqueIndex("model_id_idx").on(model.modelId),
      modelUserIdIdx: index("model_userId_idx").on(model.userId),
      modelDatasetIdIdx: index("model_datasetId_idx").on(model.datasetId),
      modelJobIdIdx: index("model_jobId_idx").on(model.jobId),
      modelStatusIdx: index("model_status_idx").on(model.status),
    };
  }
);

/**
 * Type Definitions for API Responses
 */

/**
 * RowData type
 * Represents a complete row with its associated items (cell values)
 */
export type RowData = {
  rowId: string;
  datasetId: string;
  items: RowItemData[];
};

/**
 * RowItemData type
 * Represents a single cell value with its associated column metadata
 */
export type RowItemData = {
  columnId: string;
  columnName: string;
  columnType: string;
  data: string;
};

export type IModel = {
  modelId: string;
  userId?: string;
  datasetId?: string;
  jobId?: string;
  name?: string;
  finetunedModel?: string | null;
  template?: ITemplateEnum;
  status?: IModelStatusEnum;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};
  