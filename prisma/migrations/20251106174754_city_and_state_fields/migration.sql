/*
  Warnings:

  - Added the required column `cityId` to the `candiddate_profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateId` to the `candiddate_profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityId` to the `company_profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateId` to the `company_profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityId` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateId` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candiddate_profile" ADD COLUMN     "cityId" TEXT NOT NULL,
ADD COLUMN     "stateId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "company_profile" ADD COLUMN     "cityId" TEXT NOT NULL,
ADD COLUMN     "stateId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "cityId" TEXT NOT NULL,
ADD COLUMN     "stateId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "states" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "acronym" VARCHAR(2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "stateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "states_name_key" ON "states"("name");

-- CreateIndex
CREATE UNIQUE INDEX "states_acronym_key" ON "states"("acronym");

-- AddForeignKey
ALTER TABLE "candiddate_profile" ADD CONSTRAINT "candiddate_profile_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candiddate_profile" ADD CONSTRAINT "candiddate_profile_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_profile" ADD CONSTRAINT "company_profile_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_profile" ADD CONSTRAINT "company_profile_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
