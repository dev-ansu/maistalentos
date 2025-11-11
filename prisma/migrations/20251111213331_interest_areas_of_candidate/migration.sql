-- CreateTable
CREATE TABLE "InterestArea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterestArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateInterest" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "interestId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CandidateInterest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InterestArea_name_key" ON "InterestArea"("name");

-- AddForeignKey
ALTER TABLE "CandidateInterest" ADD CONSTRAINT "CandidateInterest_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candiddate_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateInterest" ADD CONSTRAINT "CandidateInterest_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "InterestArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
