/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `sub_goals` required. This step will fail if there are existing NULL values in that column.
  - Made the column `note` on table `sub_goals` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `buddy_availability` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `buddy_id` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_deleted` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "sub_goals" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "note" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "buddy_availability" SET NOT NULL,
ALTER COLUMN "buddy_id" SET NOT NULL,
ALTER COLUMN "is_deleted" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");
