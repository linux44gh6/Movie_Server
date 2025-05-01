/*
  Warnings:

  - You are about to drop the column `like` on the `likes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "likes" DROP COLUMN "like";

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "like" INTEGER DEFAULT 0;
