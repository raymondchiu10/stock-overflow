-- CreateTable
CREATE TABLE "User" (
    "uuid" UUID NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "uuid" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "quantity" INTEGER NOT NULL,
    "basePrice" DECIMAL(10,2) NOT NULL,
    "suggestedPrice" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Image" (
    "uuid" UUID NOT NULL,
    "name" VARCHAR(255),
    "url" VARCHAR(255) NOT NULL,
    "alt" VARCHAR(255),
    "cloudinary" JSONB,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "InventoryImage" (
    "uuid" UUID NOT NULL,
    "inventoryUuid" UUID NOT NULL,
    "imageUuid" UUID NOT NULL,

    CONSTRAINT "InventoryImage_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_name_key" ON "Inventory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryImage_inventoryUuid_imageUuid_key" ON "InventoryImage"("inventoryUuid", "imageUuid");

-- AddForeignKey
ALTER TABLE "InventoryImage" ADD CONSTRAINT "InventoryImage_inventoryUuid_fkey" FOREIGN KEY ("inventoryUuid") REFERENCES "Inventory"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryImage" ADD CONSTRAINT "InventoryImage_imageUuid_fkey" FOREIGN KEY ("imageUuid") REFERENCES "Image"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
