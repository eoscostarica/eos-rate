
alter table "public"."user_ratings" drop constraint "user_ratings_pkey";
alter table "public"."user_ratings"
    add constraint "producer_ratings_pkey" 
    primary key ( "bp", "user" );