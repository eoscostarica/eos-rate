alter table "public"."comment" alter column "bp" drop not null;
alter table "public"."comment" add column "bp" varchar;
