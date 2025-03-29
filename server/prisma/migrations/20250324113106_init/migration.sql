/*
  Warnings:

  - The primary key for the `ExpenseByCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `expenseBycategoryId` on the `ExpenseByCategory` table. All the data in the column will be lost.
  - You are about to drop the column `timeStamp` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `timeStamp` on the `Purchases` table. All the data in the column will be lost.
  - You are about to drop the column `timeStamp` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the `SalesSummary` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `expenseByCategoryId` to the `ExpenseByCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `amount` on the `Expenses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `timestamp` to the `Purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExpenseByCategory" DROP CONSTRAINT "ExpenseByCategory_pkey",
DROP COLUMN "expenseBycategoryId",
ADD COLUMN     "expenseByCategoryId" TEXT NOT NULL,
ADD CONSTRAINT "ExpenseByCategory_pkey" PRIMARY KEY ("expenseByCategoryId");

-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "timeStamp",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL,
DROP COLUMN "amount",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "PurchaseSummary" ALTER COLUMN "changePercentage" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Purchases" DROP COLUMN "timeStamp",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Sales" DROP COLUMN "timeStamp",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "SalesSummary";

-- CreateTable
CREATE TABLE "SalesSummary" (
    "salesSummaryId" TEXT NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL,
    "changePercentage" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesSummary_pkey" PRIMARY KEY ("salesSummaryId")
);
