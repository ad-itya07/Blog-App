/*
  Warnings:

  - You are about to drop the column `profile_pic_id` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_profile_pic_id_fkey";

-- DropIndex
DROP INDEX "User_profile_pic_id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile_pic_id";

-- AddForeignKey
ALTER TABLE "UserProfilePic" ADD CONSTRAINT "UserProfilePic_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
