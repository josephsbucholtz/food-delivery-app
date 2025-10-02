import prisma from '@/lib/prisma'
import { OrderItem } from '@prisma/client'
import { Prisma } from '@prisma/client'

export async function createOrderItem(data: Prisma.OrderItemCreateInput): Promise<OrderItem> {
    return prisma.orderItem.create({
        data,
    });
}

export async function getOrderItemById(id: number): Promise<OrderItem | null> {
    return prisma.orderItem.findUnique({
        where: { id },
    });
}

export async function getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]> {
    return prisma.orderItem.findMany({
        where: { orderId },
    });
}

export async function updateOrderItem(id: number, data: Prisma.OrderItemUpdateInput): Promise<OrderItem> {
    return prisma.orderItem.update({
        where: { id },
        data,
    });
}

export async function deleteOrderItem(id: number): Promise<OrderItem> {
    return prisma.orderItem.delete({
        where: { id },
    });
}