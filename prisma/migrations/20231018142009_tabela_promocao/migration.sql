-- CreateTable
CREATE TABLE "promote" (
    "spin_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "promote_pkey" PRIMARY KEY ("spin_id","user_id")
);

-- AddForeignKey
ALTER TABLE "promote" ADD CONSTRAINT "promote_spin_id_fkey" FOREIGN KEY ("spin_id") REFERENCES "spins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promote" ADD CONSTRAINT "promote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
