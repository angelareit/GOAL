/*
  Warnings:

  - Made the column `title` on table `main_goals` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "main_goals" ALTER COLUMN "title" SET NOT NULL;
