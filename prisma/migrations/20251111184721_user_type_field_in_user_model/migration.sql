-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('candidate', 'company');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "userType" "UserType" NOT NULL DEFAULT 'candidate';
