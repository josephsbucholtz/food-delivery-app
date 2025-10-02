import prisma from '@/lib/prisma'
import { Delivery } from '@prisma/client'
import { Prisma } from '@prisma/client'

export async function createDelivery(data: Prisma.DeliveryCreateInput): Promise<Delivery> {
    return prisma.delivery.create({
        data,
    });
}

export async function getDeliveryById(id: number): Promise<Delivery | null> {
    return prisma.delivery.findUnique({
        where: { id },
    });
}

export async function updateDelivery(id: number, data: Prisma.DeliveryUpdateInput): Promise<Delivery> {
    return prisma.delivery.update({
        where: { id },
        data,
    });
}

export async function deleteDelivery(id: number): Promise<Delivery> {
    return prisma.delivery.delete({
        where: { id },
    });
}