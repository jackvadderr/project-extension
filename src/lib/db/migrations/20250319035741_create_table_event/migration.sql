-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    "max_capacity" INTEGER NOT NULL,
    "responsible" TEXT,
    "status" TEXT DEFAULT 'scheduled',
    "event_type" TEXT,
    "privacy" TEXT DEFAULT 'public',
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "duration" INTEGER,
    "tags" TEXT,
    "event_code" TEXT,
    "budget" REAL
);
