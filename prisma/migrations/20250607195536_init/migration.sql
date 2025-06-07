-- CreateTable
CREATE TABLE "Aircraft" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "model" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "seats_total" INTEGER NOT NULL,
    "configuration" JSONB,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Aircraft_available_idx" ON "Aircraft"("available");
