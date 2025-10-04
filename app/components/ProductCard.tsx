'use client';

import { useState } from 'react';

// Types based on your Prisma schema
type ProductCategory = 'FRUIT' | 'VEGETABLE' | 'DAIRY' | 'MEAT';

interface Product {
  id: number;
  name: string;
  description: string;
  category: ProductCategory;
  pricePerUnit: number;
  weightPerUnit: number;
  quantityOnHand: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: number, quantity: number) => void;
}

const categoryColors = {
  FRUIT: 'bg-orange-100 text-orange-800',
  VEGETABLE: 'bg-green-100 text-green-800',
  DAIRY: 'bg-blue-100 text-blue-800',
  MEAT: 'bg-red-100 text-red-800',
};

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id, quantity);
    }
  };

  const isOutOfStock = product.quantityOnHand === 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image Placeholder */}
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-lg">{product.name}</span>
      </div>
      
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        
        {/* Category Badge */}
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${
          categoryColors[product.category]
        }`}>
          {product.category}
        </span>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        {/* Price and Weight */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-lg font-bold text-gray-900">
              ${product.pricePerUnit.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 ml-1">
              per {product.weightPerUnit}kg
            </span>
          </div>
        </div>
        
        {/* Stock Status */}
        <div className="mb-3">
          {isOutOfStock ? (
            <span className="text-red-600 text-sm font-medium">Out of Stock</span>
          ) : (
            <span className="text-green-600 text-sm">
              {product.quantityOnHand} in stock
            </span>
          )}
        </div>
        
        {/* Quantity Selector and Add to Cart */}
        {!isOutOfStock && (
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 py-1 hover:bg-gray-100 text-gray-600"
              >
                -
              </button>
              <span className="px-3 py-1 border-x">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.quantityOnHand, quantity + 1))}
                className="px-2 py-1 hover:bg-gray-100 text-gray-600"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}