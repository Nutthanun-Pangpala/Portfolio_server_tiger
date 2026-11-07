-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "companyTh" TEXT,
ADD COLUMN     "descriptionTh" TEXT,
ADD COLUMN     "employmentTypeTh" TEXT,
ADD COLUMN     "positionTh" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "descriptionTh" TEXT,
ADD COLUMN     "roleTh" TEXT,
ADD COLUMN     "titleTh" TEXT;
