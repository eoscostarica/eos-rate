BEGIN TRANSACTION;
ALTER TABLE "public"."comment" DROP CONSTRAINT "comment_pkey";

ALTER TABLE "public"."comment"
    ADD CONSTRAINT "comment_pkey" PRIMARY KEY ("transaction");
COMMIT TRANSACTION;
