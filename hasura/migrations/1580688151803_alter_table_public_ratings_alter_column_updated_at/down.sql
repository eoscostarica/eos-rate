
ALTER TABLE "public"."ratings" ALTER COLUMN "updated_at" TYPE integer;
COMMENT ON COLUMN "public"."ratings"."updated_at" IS E'null'