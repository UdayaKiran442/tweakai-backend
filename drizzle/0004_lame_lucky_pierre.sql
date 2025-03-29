CREATE TABLE "waitlist_users" (
	"waitlistUserId" varchar(256) PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "waitlist_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "waitlist_users_email_idx" ON "waitlist_users" USING btree ("email");