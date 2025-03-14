CREATE TYPE "public"."status" AS ENUM('ready to use', 'processing', 'ready to train', 'error');--> statement-breakpoint
CREATE TYPE "public"."template" AS ENUM('seo', 'linkedin', 'instagram');--> statement-breakpoint
CREATE TYPE "public"."type" AS ENUM('input', 'output');--> statement-breakpoint
CREATE TABLE "columns" (
	"columnId" varchar(256) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"datasetId" varchar(256) NOT NULL,
	"type" "type" NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "datasets" (
	"datasetId" varchar(256) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"userId" varchar(256) NOT NULL,
	"template" "template" NOT NULL,
	"description" text,
	"rowsCount" integer DEFAULT 0,
	"columnsCount" integer DEFAULT 0,
	"status" "status",
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "rows" (
	"rowId" varchar(256) PRIMARY KEY NOT NULL,
	"datasetId" varchar(256) NOT NULL,
	"columnId" varchar(256) NOT NULL,
	"data" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX "columns_id_idx" ON "columns" USING btree ("columnId");--> statement-breakpoint
CREATE INDEX "columns_datasetId_idx" ON "columns" USING btree ("datasetId");--> statement-breakpoint
CREATE UNIQUE INDEX "datasets_id_idx" ON "datasets" USING btree ("datasetId");--> statement-breakpoint
CREATE INDEX "datasets_userId_idx" ON "datasets" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX "rows_id_idx" ON "rows" USING btree ("rowId");--> statement-breakpoint
CREATE INDEX "rows_datasetId_idx" ON "rows" USING btree ("datasetId");--> statement-breakpoint
CREATE INDEX "rows_columnId_idx" ON "rows" USING btree ("columnId");