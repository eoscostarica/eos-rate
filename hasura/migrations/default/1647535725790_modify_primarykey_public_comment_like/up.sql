BEGIN TRANSACTION;
ALTER TABLE "public"."comment_like" DROP CONSTRAINT "comment_like_pkey";

ALTER TABLE "public"."comment_like"
    ADD CONSTRAINT "comment_like_pkey" PRIMARY KEY ("transaction", "id");
COMMIT TRANSACTION;
