-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "books" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "isbn" VARCHAR(13) NOT NULL,
    "language" VARCHAR(10) NOT NULL,
    "status" "BookStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "books_isbn_key" ON "books"("isbn");
