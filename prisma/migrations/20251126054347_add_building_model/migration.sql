/*
  Warnings:

  - You are about to drop the column `pincode` on the `Building` table. All the data in the column will be lost.
  - Made the column `address` on table `Building` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerName` on table `Building` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contactNumber` on table `Building` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Building` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Building" DROP COLUMN "pincode",
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "ownerName" SET NOT NULL,
ALTER COLUMN "contactNumber" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;
