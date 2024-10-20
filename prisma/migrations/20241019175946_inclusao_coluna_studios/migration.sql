/*
  Warnings:

  - Added the required column `studios` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "year" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "studios" TEXT NOT NULL,
    "producers" TEXT NOT NULL,
    "winner" TEXT NOT NULL
);
INSERT INTO "new_Movies" ("id", "producers", "title", "winner", "year") SELECT "id", "producers", "title", "winner", "year" FROM "Movies";
DROP TABLE "Movies";
ALTER TABLE "new_Movies" RENAME TO "Movies";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
