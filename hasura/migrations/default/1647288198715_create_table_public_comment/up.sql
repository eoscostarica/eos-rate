CREATE TABLE "public"."comment" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "user" character varying NOT NULL, "bp" varchar NOT NULL, "content" character varying NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("bp") REFERENCES "public"."producers"("owner") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
