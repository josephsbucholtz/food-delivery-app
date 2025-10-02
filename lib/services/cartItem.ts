import prisma from '@/lib/prisma';
import { CartItem } from '@prisma/client';
import { Prisma } from '@prisma/client';

export async function createCartItem(data: Prisma.CartItemCreateInput): Promise<CartItem> {
    return prisma.cartItem.create({
        data,
    })
}

export async function getCartItemById(id: number): Promise<CartItem | null> {
    return prisma.cartItem.findUnique({
        where: { id },
    });
}

export async function getCartItemsByCartId(cartId: number): Promise<CartItem[]> {
    return prisma.cartItem.findMany({
        where: { cartId },
    });
}

export async function updateCartItem(id: number, data: Prisma.CartItemUpdateInput): Promise<CartItem> {
    return prisma.cartItem.update({
        where: { id },
        data,
    });
}

export async function deleteCartItem(id: number): Promise<CartItem> {
    return prisma.cartItem.delete({
        where: { id },
    });
}