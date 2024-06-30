-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "self_ref_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_self_ref_id_fkey" FOREIGN KEY ("self_ref_id") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
