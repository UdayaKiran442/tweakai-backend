ALTER TYPE "public"."template" ADD VALUE 'resume';--> statement-breakpoint
CREATE TABLE "row_items" (
	"rowItemId" varchar(256) PRIMARY KEY NOT NULL,
	"rowId" varchar(256) NOT NULL,
	"columnId" varchar(256) NOT NULL,
	"data" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP INDEX "rows_columnId_idx";--> statement-breakpoint
CREATE UNIQUE INDEX "row_items_id_idx" ON "row_items" USING btree ("rowItemId");--> statement-breakpoint
CREATE INDEX "row_items_rowId_idx" ON "row_items" USING btree ("rowId");--> statement-breakpoint
CREATE INDEX "row_items_columnId_idx" ON "row_items" USING btree ("columnId");--> statement-breakpoint
ALTER TABLE "rows" DROP COLUMN "columnId";--> statement-breakpoint
ALTER TABLE "rows" DROP COLUMN "data";