/*
  Warnings:

  - Changed the type of `role_int` on the `user_role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "user_role" DROP COLUMN "role_int",
ADD COLUMN     "role_int" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_role_role_int_key" ON "user_role"("role_int");
