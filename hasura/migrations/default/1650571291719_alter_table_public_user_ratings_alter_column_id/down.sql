alter table "public"."user_ratings" alter column "id" set default nextval('user_ratings_id_seq'::regclass);
