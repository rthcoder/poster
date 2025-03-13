-- CreateTable
CREATE TABLE "user_role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "region" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "branch_id" INTEGER,
    "company_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "branch" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "region_id" INTEGER,
    "company_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "branch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_role_name_key" ON "user_role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_role_role_id_key" ON "user_role"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "user_role"("role_id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branch" ADD CONSTRAINT "branch_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branch" ADD CONSTRAINT "branch_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
