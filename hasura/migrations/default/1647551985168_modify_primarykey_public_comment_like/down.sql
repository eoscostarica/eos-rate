alter table "public"."comment_like" drop constraint "comment_like_pkey";
alter table "public"."comment_like"
    add constraint "comment_like_pkey"
    primary key ("id", "transaction");
