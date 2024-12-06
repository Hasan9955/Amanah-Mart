/*
  Warnings:

  - You are about to drop the column `createdByRole` on the `Coupon` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `Coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `redirectTo` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "createdByRole",
ADD COLUMN     "createdBy" "UserRole" NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "redirectTo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
