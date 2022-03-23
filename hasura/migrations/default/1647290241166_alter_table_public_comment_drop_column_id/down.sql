alter table "public"."comment" alter column "id" set default gen_random_uuid();
alter table "public"."comment" alter column "id" drop not null;
alter table "public"."comment" add column "id" uuid;
