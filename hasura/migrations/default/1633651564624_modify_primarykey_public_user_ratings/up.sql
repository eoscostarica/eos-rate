BEGIN TRANSACTION;
ALTER TABLE "public"."user_ratings" DROP CONSTRAINT "user_ratings_pkey";

ALTER TABLE "public"."user_ratings"
    ADD CONSTRAINT "user_ratings_pkey" PRIMARY KEY ("id");
COMMIT TRANSACTION;
