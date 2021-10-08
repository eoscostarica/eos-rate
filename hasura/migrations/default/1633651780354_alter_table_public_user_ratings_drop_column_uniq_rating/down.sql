alter table "public"."user_ratings" add constraint "user_ratings_uniq_rating_key" unique (uniq_rating);
alter table "public"."user_ratings" alter column "uniq_rating" drop not null;
alter table "public"."user_ratings" add column "uniq_rating" text;
