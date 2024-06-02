-- CreateEnum
CREATE TYPE "Tags" AS ENUM ('EXP', 'FINAL', 'PROTO');

-- CreateTable
CREATE TABLE "Experimental" (
    "id" TEXT NOT NULL,
    "tag" "Tags" NOT NULL DEFAULT 'EXP',
    "completed" BOOLEAN NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Experimental_pkey" PRIMARY KEY ("id")
);
