/*
  Warnings:

  - You are about to alter the column `accuracy` on the `Results` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Results" ALTER COLUMN "accuracy" SET DATA TYPE INTEGER;
