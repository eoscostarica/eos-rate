
ALTER TABLE "public"."ratings" ALTER COLUMN "created_at" TYPE integer;
COMMENT ON COLUMN "public"."ratings"."created_at" IS E'null'