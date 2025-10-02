import prisma from '@/lib/prisma'
import { $Enums, Product } from '@prisma/client'
import { Prisma } from '@prisma/client'

export async function createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return prisma.product.create({
        data,
    });
}

export async function getProductById(id: number): Promise<Product | null> {
    return prisma.product.findUnique({
        where: { id },
    });
}

export async function getProductsByName(name: string): Promise<Product[]> {
    return prisma.product.findMany({
        where: { name },
    });
}

export async function getProductsByCategory(category: $Enums.ProductCategory): Promise<Product[]> {
    return prisma.product.findMany({
        where: { category },
    });
}

export async function getAllProducts(): Promise<Product[]> {
    return prisma.product.findMany({
    });
}

export async function updateProduct(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
    return prisma.product.update({
        where: { id },
        data,
    });
}

export async function deleteProduct(id: number): Promise<Product> {
    return prisma.product.delete({
        where: { id },
    });
}