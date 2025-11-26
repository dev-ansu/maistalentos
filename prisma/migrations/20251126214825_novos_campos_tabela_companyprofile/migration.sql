-- AlterTable
ALTER TABLE "company_profile" ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "phone" TEXT;

-- CreateTable
CREATE TABLE "CompanyInterest" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "interestId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyInterest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyInterest_companyId_interestId_key" ON "CompanyInterest"("companyId", "interestId");

-- AddForeignKey
ALTER TABLE "CompanyInterest" ADD CONSTRAINT "CompanyInterest_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyInterest" ADD CONSTRAINT "CompanyInterest_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "InterestArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
