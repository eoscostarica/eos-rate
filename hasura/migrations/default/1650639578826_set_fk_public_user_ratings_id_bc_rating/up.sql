alter table "public"."user_ratings"
  add constraint "user_ratings_id_bc_rating_fkey"
  foreign key ("id_bc_rating")
  references "public"."comment"
  ("rating_id") on update restrict on delete restrict;
