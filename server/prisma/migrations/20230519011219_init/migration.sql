/*
  Warnings:

  - A unique constraint covering the columns `[child_id]` on the table `goal_relationship` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,category_id]` on the table `interests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "goal_relationship_child_id_key" ON "goal_relationship"("child_id");

-- CreateIndex
CREATE UNIQUE INDEX "interests_user_id_category_id_key" ON "interests"("user_id", "category_id");
