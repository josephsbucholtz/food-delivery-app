import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import { Prisma } from '@prisma/client';

export async function createUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
        data,
    })
}

export async function getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
        where: { id },
    });
}

export async function getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
        where: { email },
    });
}

export async function updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user.update({
        where: { id },
        data,
    });
}

export async function deleteUser(id: number): Promise<User> {
    return prisma.user.delete({
        where: { id },
    });
}

export async function deleteUserByEmail(email: string): Promise<User> {
    return prisma.user.delete({
        where: {
            email,
        }
    })
}