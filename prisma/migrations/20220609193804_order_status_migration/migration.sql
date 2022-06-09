-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'PAID', 'CANCELLED');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "status" "Status" NOT NULL DEFAULT E'PENDING';
