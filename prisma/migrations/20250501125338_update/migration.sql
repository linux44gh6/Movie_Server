-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_videoId_fkey";

-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "reviewId" TEXT,
ALTER COLUMN "videoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "reviews"("id") ON DELETE SET NULL ON UPDATE CASCADE;
