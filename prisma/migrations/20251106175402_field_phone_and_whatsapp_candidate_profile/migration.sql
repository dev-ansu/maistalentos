/*
  Warnings:

  - Added the required column `phone` to the `candiddate_profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsapp` to the `candiddate_profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candiddate_profile" ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "whatsapp" TEXT NOT NULL;
