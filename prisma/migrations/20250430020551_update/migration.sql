/*
  Warnings:

  - You are about to drop the column `isSpoiler` on the `reviews` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "isSpoiler",
ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;
