/*
  Warnings:

  - Changed the type of `type` on the `jobs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "type",
ADD COLUMN     "type" "WorkModel" NOT NULL;

-- DropEnum
DROP TYPE "JobType";
