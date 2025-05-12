/*
  Warnings:

  - You are about to drop the column `userId` on the `Ad` table. All the data in the column will be lost.
  - Added the required column `category` to the `Ad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `Ad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Ad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ad" DROP COLUMN "userId",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "contact" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL;
