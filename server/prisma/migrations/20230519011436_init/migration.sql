-- DropForeignKey
ALTER TABLE "goal_relationship" DROP CONSTRAINT "goal_relationship_parent_id_fkey";

-- AddForeignKey
ALTER TABLE "goal_relationship" ADD CONSTRAINT "goal_relationship_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "sub_goals"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
