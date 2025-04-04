-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "event_date" DATETIME NOT NULL,
    "location" TEXT NOT NULL DEFAULT 'R. Nicarágua, 1226 - Nova Porto Velho, Porto Velho - RO, 76820-830',
    "max_capacity" INTEGER NOT NULL DEFAULT 100,
    "status" TEXT DEFAULT 'scheduled',
    "event_type" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "duration" REAL NOT NULL,
    "rent" REAL NOT NULL
);
