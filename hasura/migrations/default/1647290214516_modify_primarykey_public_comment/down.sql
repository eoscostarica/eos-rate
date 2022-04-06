alter table "public"."comment" drop constraint "comment_pkey";
alter table "public"."comment"
    add constraint "comment_pkey"
    primary key ("id");
