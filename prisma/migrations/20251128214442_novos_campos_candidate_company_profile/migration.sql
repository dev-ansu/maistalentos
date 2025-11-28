/*
  Warnings:

  - You are about to drop the `candiddate_profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'non_binary', 'other', 'prefer_not_to_say');

-- CreateEnum
CREATE TYPE "CompanySize" AS ENUM ('micro', 'small', 'medium', 'large', 'enterprise');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('pending', 'approved', 'rejected', 'under_review');

-- CreateEnum
CREATE TYPE "Ethnicity" AS ENUM ('white', 'black', 'brown', 'indigenous', 'asian', 'other', 'prefer_not_to_say');

-- CreateEnum
CREATE TYPE "WorkModel" AS ENUM ('presencial', 'hibrido', 'remoto');

-- DropForeignKey
ALTER TABLE "CandidateInterest" DROP CONSTRAINT "CandidateInterest_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "candiddate_profile" DROP CONSTRAINT "candiddate_profile_cityId_fkey";

-- DropForeignKey
ALTER TABLE "candiddate_profile" DROP CONSTRAINT "candiddate_profile_stateId_fkey";

-- DropForeignKey
ALTER TABLE "candiddate_profile" DROP CONSTRAINT "candiddate_profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "educations" DROP CONSTRAINT "educations_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "experiences" DROP CONSTRAINT "experiences_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "languages" DROP CONSTRAINT "languages_candidateId_fkey";

-- AlterTable
ALTER TABLE "company_profile" ADD COLUMN     "address" TEXT,
ADD COLUMN     "companySize" "CompanySize",
ADD COLUMN     "foundedYear" INTEGER,
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "verificationNotes" TEXT,
ADD COLUMN     "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'pending',
ADD COLUMN     "zipCode" TEXT;

-- DropTable
DROP TABLE "candiddate_profile";

-- CreateTable
CREATE TABLE "candidate_profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "summary" TEXT,
    "resumeUrl" TEXT,
    "phone" TEXT,
    "whatsapp" TEXT,
    "stateId" TEXT,
    "gender" "Gender",
    "ethnicity" "Ethnicity",
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "salaryExpectation" DOUBLE PRECISION,
    "workModel" "WorkModel"[],
    "email" TEXT,
    "portfolioUrl" TEXT,
    "willingnessToTravel" BOOLEAN NOT NULL DEFAULT false,
    "willingnessToRelocate" BOOLEAN NOT NULL DEFAULT false,
    "cityId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidate_profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "candidate_profile_userId_key" ON "candidate_profile"("userId");

-- CreateIndex
CREATE INDEX "candidate_profile_isAvailable_stateId_cityId_idx" ON "candidate_profile"("isAvailable", "stateId", "cityId");

-- CreateIndex
CREATE INDEX "company_profile_isVerified_isActive_idx" ON "company_profile"("isVerified", "isActive");

-- AddForeignKey
ALTER TABLE "candidate_profile" ADD CONSTRAINT "candidate_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_profile" ADD CONSTRAINT "candidate_profile_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_profile" ADD CONSTRAINT "candidate_profile_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidate_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educations" ADD CONSTRAINT "educations_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidate_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidate_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "languages" ADD CONSTRAINT "languages_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidate_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidate_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateInterest" ADD CONSTRAINT "CandidateInterest_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidate_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
