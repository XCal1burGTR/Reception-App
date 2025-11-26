/*
  Warnings:

  - You are about to drop the column `slackUserId` on the `Employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Made the column `password` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_hostEmployeeId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "slackUserId",
ALTER COLUMN "password" SET NOT NULL;

-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "hostName" TEXT,
ALTER COLUMN "hostEmployeeId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_hostEmployeeId_fkey" FOREIGN KEY ("hostEmployeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
