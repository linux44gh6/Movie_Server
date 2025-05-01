/*
  Warnings:

  - You are about to drop the column `rating` on the `video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "video" DROP COLUMN "rating",
ALTER COLUMN "like" DROP NOT NULL,
ALTER COLUMN "dislike" DROP NOT NULL;
