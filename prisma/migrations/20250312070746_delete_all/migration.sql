/*
  Warnings:

  - You are about to drop the column `role_int` on the `user_role` table. All the data in the column will be lost.
  - You are about to drop the `company` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "branch" DROP CONSTRAINT "branch_company_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_company_id_fkey";

-- DropIndex
DROP INDEX "user_role_role_int_key";

-- AlterTable
ALTER TABLE "user_role" DROP COLUMN "role_int";

-- DropTable
DROP TABLE "company";

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branch" ADD CONSTRAINT "branch_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
