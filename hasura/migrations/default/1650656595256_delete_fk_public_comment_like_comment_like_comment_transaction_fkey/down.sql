alter table "public"."comment_like"
  add constraint "comment_like_comment_transaction_fkey"
  foreign key ("comment_transaction")
  references "public"."comment"
  ("transaction") on update restrict on delete restrict;
