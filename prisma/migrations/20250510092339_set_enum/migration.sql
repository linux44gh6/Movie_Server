/*
  Warnings:

  - The `adminStatus` column on the `payments` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AdminStatus" AS ENUM ('true', 'false', 'reject');

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "adminStatus",
ADD COLUMN     "adminStatus" "AdminStatus" NOT NULL DEFAULT 'false';
