/*
  Warnings:

  - You are about to drop the column `steamingLink` on the `video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "video" DROP COLUMN "steamingLink",
ADD COLUMN     "streamingLink" TEXT;
