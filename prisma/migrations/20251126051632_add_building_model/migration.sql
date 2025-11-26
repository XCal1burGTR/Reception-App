/*
  Warnings:

  - You are about to drop the column `address` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `contactNumber` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `ownerName` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `pincode` on the `Tenant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "address",
DROP COLUMN "contactNumber",
DROP COLUMN "email",
DROP COLUMN "ownerName",
DROP COLUMN "pincode",
ADD COLUMN     "buildingId" TEXT;

-- CreateTable
CREATE TABLE "Building" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "pincode" TEXT,
    "ownerName" TEXT,
    "contactNumber" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE SET NULL ON UPDATE CASCADE;
