CREATE TABLE "public"."eden_ratings_stats" ("bp" varchar NOT NULL, "ratings_cntr" integer, "average" numeric, "transparency" numeric, "infrastructure" numeric, "trustiness" numeric, "community" numeric, "development" numeric, "created_at" timestamptz DEFAULT now(), "updated_at" timestamptz DEFAULT now(), PRIMARY KEY ("bp") );
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_eden_ratings_stats_updated_at"
BEFORE UPDATE ON "public"."eden_ratings_stats"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_eden_ratings_stats_updated_at" ON "public"."eden_ratings_stats" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
