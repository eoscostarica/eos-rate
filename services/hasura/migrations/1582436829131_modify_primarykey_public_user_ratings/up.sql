
alter table "public"."user_ratings" drop constraint "producer_ratings_pkey";
alter table "public"."user_ratings"
    add constraint "user_ratings_pkey" 
    primary key ( "uniq_rating" );