alter table "public"."user_ratings"
  add constraint "user_ratings_comment_fkey"
  foreign key ("comment")
  references "public"."comment"
  ("transaction") on update restrict on delete restrict;
