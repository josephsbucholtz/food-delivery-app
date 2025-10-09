import { Product } from "@prisma/client";
import { ProductClient } from "@/types/ofs/product-client";

// Explicitly convert a Product (with Decimals) to ProductClient (with numbers)
export function productToProductClient(product: Product): ProductClient {
    return {
        ...product,
        pricePerUnit: product.pricePerUnit.toNumber(),
        weightPerUnit: product.weightPerUnit.toNumber(),
    };
}