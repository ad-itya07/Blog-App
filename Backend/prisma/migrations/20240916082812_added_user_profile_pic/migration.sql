/*
  Warnings:

  - A unique constraint covering the columns `[profile_pic_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profile_pic_id" INTEGER;

-- CreateTable
CREATE TABLE "UserProfilePic" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "UserProfilePic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_profile_pic_id_key" ON "User"("profile_pic_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profile_pic_id_fkey" FOREIGN KEY ("profile_pic_id") REFERENCES "UserProfilePic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
