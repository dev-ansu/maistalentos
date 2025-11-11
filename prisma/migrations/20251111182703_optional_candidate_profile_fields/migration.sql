-- DropForeignKey
ALTER TABLE "candiddate_profile" DROP CONSTRAINT "candiddate_profile_cityId_fkey";

-- DropForeignKey
ALTER TABLE "candiddate_profile" DROP CONSTRAINT "candiddate_profile_stateId_fkey";

-- AlterTable
ALTER TABLE "candiddate_profile" ALTER COLUMN "cityId" DROP NOT NULL,
ALTER COLUMN "stateId" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "whatsapp" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "candiddate_profile" ADD CONSTRAINT "candiddate_profile_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candiddate_profile" ADD CONSTRAINT "candiddate_profile_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
