alter table "public"."comment" drop constraint "comment_bp_fkey",
  add constraint "comment_bp_fkey"
  foreign key ("bp")
  references "public"."producers"
  ("owner") on update restrict on delete restrict;
