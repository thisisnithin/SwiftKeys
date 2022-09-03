-- DropForeignKey
ALTER TABLE "Results" DROP CONSTRAINT "Results_userId_fkey";

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
