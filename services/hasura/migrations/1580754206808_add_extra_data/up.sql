
ALTER TABLE "public".producer_ratings ADD tx_data jsonb;
ALTER TABLE "public".producer_ratings RENAME TO user_ratings;
ALTER TABLE "public".producers ADD general_info jsonb;