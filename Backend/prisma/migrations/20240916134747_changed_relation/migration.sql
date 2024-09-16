/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserProfilePic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `UserProfilePic` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserProfilePic" DROP CONSTRAINT "UserProfilePic_id_fkey";

-- AlterTable
CREATE SEQUENCE userprofilepic_id_seq;
ALTER TABLE "UserProfilePic" ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('userprofilepic_id_seq');
ALTER SEQUENCE userprofilepic_id_seq OWNED BY "UserProfilePic"."id";

-- CreateIndex
CREATE UNIQUE INDEX "UserProfilePic_userId_key" ON "UserProfilePic"("userId");

-- AddForeignKey
ALTER TABLE "UserProfilePic" ADD CONSTRAINT "UserProfilePic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
