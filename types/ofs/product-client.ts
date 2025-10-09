import { Product } from "@prisma/client";

export type ProductClient = Omit<Product, 'pricePerUnit' | 'weightPerUnit'> & {
    pricePerUnit: number;
    weightPerUnit: number;
};