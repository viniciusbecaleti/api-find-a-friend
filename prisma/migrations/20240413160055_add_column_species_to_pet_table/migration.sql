/*
  Warnings:

  - Added the required column `species` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PetSpecies" AS ENUM ('DOG', 'CAT');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "species" "PetSpecies" NOT NULL;
