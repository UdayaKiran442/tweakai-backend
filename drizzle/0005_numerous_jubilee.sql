ALTER TABLE "model" ADD COLUMN "jobId" varchar(256) NOT NULL;--> statement-breakpoint
CREATE INDEX "model_jobId_idx" ON "model" USING btree ("jobId");--> statement-breakpoint
CREATE INDEX "model_status_idx" ON "model" USING btree ("status");--> statement-breakpoint
ALTER TABLE "public"."model" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."modelStatus";--> statement-breakpoint
CREATE TYPE "public"."modelStatus" AS ENUM('pending', 'succeeded', 'failed');--> statement-breakpoint
ALTER TABLE "public"."model" ALTER COLUMN "status" SET DATA TYPE "public"."modelStatus" USING "status"::"public"."modelStatus";