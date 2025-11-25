/*
  Warnings:

  - A unique constraint covering the columns `[candidateId,interestId]` on the table `CandidateInterest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CandidateInterest_candidateId_interestId_key" ON "CandidateInterest"("candidateId", "interestId");
