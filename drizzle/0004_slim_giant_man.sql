CREATE TYPE "public"."modelStatus" AS ENUM('pending', 'success', 'error');--> statement-breakpoint
CREATE TABLE "model" (
	"modelId" varchar(256) PRIMARY KEY NOT NULL,
	"userId" varchar(256) NOT NULL,
	"datasetId" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL,
	"template" "template" NOT NULL,
	"status" "modelStatus" NOT NULL,
	"description" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX "model_id_idx" ON "model" USING btree ("modelId");--> statement-breakpoint
CREATE INDEX "model_userId_idx" ON "model" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "model_datasetId_idx" ON "model" USING btree ("datasetId");