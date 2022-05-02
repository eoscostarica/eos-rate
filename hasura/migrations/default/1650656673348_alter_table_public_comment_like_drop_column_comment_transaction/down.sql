alter table "public"."comment_like" alter column "comment_transaction" drop not null;
alter table "public"."comment_like" add column "comment_transaction" varchar;
