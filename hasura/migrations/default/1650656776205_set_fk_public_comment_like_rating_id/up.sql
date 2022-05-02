alter table "public"."comment_like"
  add constraint "comment_like_rating_id_fkey"
  foreign key ("rating_id")
  references "public"."comment"
  ("rating_id") on update restrict on delete restrict;
