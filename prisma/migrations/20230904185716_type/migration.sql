-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_typeCardId_fkey";

-- CreateTable
CREATE TABLE "_CardToTypeCard" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CardToTypeCard_AB_unique" ON "_CardToTypeCard"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToTypeCard_B_index" ON "_CardToTypeCard"("B");

-- AddForeignKey
ALTER TABLE "_CardToTypeCard" ADD CONSTRAINT "_CardToTypeCard_A_fkey" FOREIGN KEY ("A") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToTypeCard" ADD CONSTRAINT "_CardToTypeCard_B_fkey" FOREIGN KEY ("B") REFERENCES "cards-type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
