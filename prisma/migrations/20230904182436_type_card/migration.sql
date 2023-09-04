-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "typeCardId" INTEGER;

-- CreateTable
CREATE TABLE "cards-type" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cards-type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cards-type_type_key" ON "cards-type"("type");

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_typeCardId_fkey" FOREIGN KEY ("typeCardId") REFERENCES "cards-type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
