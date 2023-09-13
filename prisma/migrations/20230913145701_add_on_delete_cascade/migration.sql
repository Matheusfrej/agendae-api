-- DropForeignKey
ALTER TABLE "block" DROP CONSTRAINT "block_blocked_id_fkey";

-- DropForeignKey
ALTER TABLE "block" DROP CONSTRAINT "block_blocker_id_fkey";

-- DropForeignKey
ALTER TABLE "friendship" DROP CONSTRAINT "friendship_received_id_fkey";

-- DropForeignKey
ALTER TABLE "friendship" DROP CONSTRAINT "friendship_sent_id_fkey";

-- DropForeignKey
ALTER TABLE "participate_spin" DROP CONSTRAINT "participate_spin_received_id_fkey";

-- DropForeignKey
ALTER TABLE "participate_spin" DROP CONSTRAINT "participate_spin_spin_id_fkey";

-- DropForeignKey
ALTER TABLE "report" DROP CONSTRAINT "report_reported_id_fkey";

-- DropForeignKey
ALTER TABLE "report" DROP CONSTRAINT "report_reporter_id_fkey";

-- DropForeignKey
ALTER TABLE "spins" DROP CONSTRAINT "spins_organizer_id_fkey";

-- AddForeignKey
ALTER TABLE "spins" ADD CONSTRAINT "spins_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participate_spin" ADD CONSTRAINT "participate_spin_spin_id_fkey" FOREIGN KEY ("spin_id") REFERENCES "spins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participate_spin" ADD CONSTRAINT "participate_spin_received_id_fkey" FOREIGN KEY ("received_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_sent_id_fkey" FOREIGN KEY ("sent_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_received_id_fkey" FOREIGN KEY ("received_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_reported_id_fkey" FOREIGN KEY ("reported_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "block" ADD CONSTRAINT "block_blocker_id_fkey" FOREIGN KEY ("blocker_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "block" ADD CONSTRAINT "block_blocked_id_fkey" FOREIGN KEY ("blocked_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
