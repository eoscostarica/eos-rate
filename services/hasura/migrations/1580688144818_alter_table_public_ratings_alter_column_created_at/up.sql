
ALTER TABLE "public"."ratings" ALTER COLUMN "created_at" TYPE int8;
COMMENT ON COLUMN "public"."ratings"."created_at" IS E''