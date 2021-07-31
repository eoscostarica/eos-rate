
ALTER TABLE "public"."ratings" ALTER COLUMN "updated_at" TYPE int8;
COMMENT ON COLUMN "public"."ratings"."updated_at" IS E''