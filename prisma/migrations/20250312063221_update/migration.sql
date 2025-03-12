/*
  Warnings:

  - A unique constraint covering the columns `[role_int]` on the table `user_role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role_int` to the `user_role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_role" ADD COLUMN     "role_int" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_role_role_int_key" ON "user_role"("role_int");
