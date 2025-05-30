/*
  Warnings:

  - You are about to drop the column `basePrice` on the `inventory` table. All the data in the column will be lost.
  - You are about to drop the column `suggestedPrice` on the `inventory` table. All the data in the column will be lost.
  - Added the required column `base_price` to the `inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suggested_price` to the `inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "inventory" DROP COLUMN "basePrice",
DROP COLUMN "suggestedPrice",
ADD COLUMN     "base_price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "suggested_price" DECIMAL(10,2) NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT;
