/*
  Warnings:

  - The primary key for the `Ad` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category` on the `Ad` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `Ad` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Ad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ad" DROP CONSTRAINT "Ad_pkey",
DROP COLUMN "category",
DROP COLUMN "contact",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Ad_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Ad_id_seq";
