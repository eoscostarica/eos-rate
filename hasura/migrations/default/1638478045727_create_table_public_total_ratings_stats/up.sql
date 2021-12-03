CREATE TABLE "public"."total_ratings_stats" ("bp" varchar NOT NULL, "ratings_cntr" integer NOT NULL, "average" Numeric NOT NULL, "transparency" numeric NOT NULL, "infrastructure" numeric NOT NULL, "trustiness" numeric NOT NULL, "community" numeric NOT NULL, "development" numeric NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("bp") );
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
CREATE TRIGGER "set_public_total_ratings_stats_updated_at"
BEFORE UPDATE ON "public"."total_ratings_stats"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_total_ratings_stats_updated_at" ON "public"."total_ratings_stats" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
