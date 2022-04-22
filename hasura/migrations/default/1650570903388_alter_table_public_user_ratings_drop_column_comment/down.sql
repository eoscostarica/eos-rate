alter table "public"."user_ratings" alter column "comment" drop not null;
alter table "public"."user_ratings" add column "comment" varchar;
