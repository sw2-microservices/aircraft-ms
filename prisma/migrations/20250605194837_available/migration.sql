-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aircraft" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "model" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "seats_total" INTEGER NOT NULL,
    "configuration" JSONB,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Aircraft" ("configuration", "created_at", "id", "model", "registration", "seats_total", "updated_at") SELECT "configuration", "created_at", "id", "model", "registration", "seats_total", "updated_at" FROM "Aircraft";
DROP TABLE "Aircraft";
ALTER TABLE "new_Aircraft" RENAME TO "Aircraft";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
