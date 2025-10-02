import prisma from '@/lib/prisma';
import { Cart } from '@prisma/client';
import { Prisma } from '@prisma/client';

export async function createCart(data: Prisma.CartCreateInput): Promise<Cart> {
    return prisma.cart.create({
        data,
    })
}

export async function getCartById(id: number): Promise<Cart | null> {
    return prisma.cart.findUnique({
        where: { id },
    });
}

export async function getCartByUserId(userId: number): Promise<Cart | null> {
    return prisma.cart.findUnique({
        where: { userId },
    });
}

export async function updateCart(id: number, data: Prisma.CartUpdateInput): Promise<Cart> {
    return prisma.cart.update({
        where: { id },
        data,
    });
}

export async function deleteCart(id: number): Promise<Cart> {
    return prisma.cart.delete({
        where: { id },
    });
}