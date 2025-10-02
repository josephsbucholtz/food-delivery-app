import prisma from '@/lib/prisma';
import { DeliveryAddress } from '@prisma/client';
import { Prisma } from '@prisma/client';

export async function createDeliveryAddress(data: Prisma.DeliveryAddressCreateInput): Promise<DeliveryAddress> {
    return prisma.deliveryAddress.create({
        data,
    })
}

export async function getDeliveryAddressById(id: number): Promise<DeliveryAddress | null> {
    return prisma.deliveryAddress.findUnique({
        where: { id },
    });
}

export async function getDeliveryAddressesByUserId(userId: number): Promise<DeliveryAddress[]> {
    return prisma.deliveryAddress.findMany({
        where: { userId },
    });
}

export async function updateDeliveryAddress(id: number, data: Prisma.DeliveryAddressUpdateInput): Promise<DeliveryAddress> {
    return prisma.deliveryAddress.update({
        where: { id },
        data,
    });
}

export async function deleteDeliveryAddress(id: number): Promise<DeliveryAddress> {
    return prisma.deliveryAddress.delete({
        where: { id },
    });
}