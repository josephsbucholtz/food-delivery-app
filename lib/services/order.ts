import prisma from '@/lib/prisma'
import { $Enums, Order } from '@prisma/client'
import { Prisma } from '@prisma/client'

export async function createOrder(data: Prisma.OrderCreateInput): Promise<Order> {
    return prisma.order.create({
        data,
    });
}

export async function getOrderById(id: number): Promise<Order | null> {
    return prisma.order.findUnique({
        where: { id },
    });
}

export async function getOrdersByDeliveryId(deliveryId: number): Promise<Order[]> {
    return prisma.order.findMany({
        where: { deliveryId },
    });
}

export async function getOrdersByUserId(userId: number): Promise<Order[]> {
    return prisma.order.findMany({
        where: { userId },
    });
}

export async function getOrdersByStatus(status: $Enums.OrderStatus): Promise<Order[]> {
    return prisma.order.findMany({
        where: { status },
    });
}

export async function updateOrder(id: number, data: Prisma.OrderUpdateInput): Promise<Order> {
    return prisma.order.update({
        where: { id },
        data,
    });
}

export async function deleteOrder(id: number): Promise<Order> {
    return prisma.order.delete({
        where: { id },
    });
}