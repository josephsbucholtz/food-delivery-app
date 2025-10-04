'use client';

import ProductCard from './ProductCard';

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

// Dummy data based on your schema
const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Fresh Apples",
    description: "Crisp and sweet red apples, perfect for snacking or baking. Locally sourced and organic.",
    category: "FRUIT",
    pricePerUnit: 3.99,
    weightPerUnit: 1.0,
    quantityOnHand: 50
  },
  {
    id: 2,
    name: "Organic Spinach",
    description: "Fresh organic spinach leaves, great for salads, smoothies, or cooking. Rich in iron and vitamins.",
    category: "VEGETABLE",
    pricePerUnit: 2.49,
    weightPerUnit: 0.5,
    quantityOnHand: 25
  },
  {
    id: 3,
    name: "Whole Milk",
    description: "Fresh whole milk from local dairy farms. Rich and creamy, perfect for cereals and cooking.",
    category: "DAIRY",
    pricePerUnit: 4.29,
    weightPerUnit: 1.0,
    quantityOnHand: 30
  },
  {
    id: 4,
    name: "Premium Ground Beef",
    description: "High-quality ground beef, 85% lean. Perfect for burgers, tacos, and pasta dishes.",
    category: "MEAT",
    pricePerUnit: 8.99,
    weightPerUnit: 0.5,
    quantityOnHand: 15
  },
  {
    id: 5,
    name: "Bananas",
    description: "Ripe yellow bananas, sweet and nutritious. Great for breakfast, smoothies, or snacks.",
    category: "FRUIT",
    pricePerUnit: 1.99,
    weightPerUnit: 1.0,
    quantityOnHand: 100
  },
  {
    id: 6,
    name: "Fresh Broccoli",
    description: "Green and fresh broccoli crowns. Packed with nutrients and perfect for steaming or stir-fry.",
    category: "VEGETABLE",
    pricePerUnit: 2.99,
    weightPerUnit: 0.75,
    quantityOnHand: 20
  },
  {
    id: 7,
    name: "Greek Yogurt",
    description: "Creamy Greek yogurt, high in protein. Available in vanilla flavor, great for breakfast or snacks.",
    category: "DAIRY",
    pricePerUnit: 5.99,
    weightPerUnit: 0.5,
    quantityOnHand: 0 // Out of stock example
  },
  {
    id: 8,
    name: "Chicken Breast",
    description: "Boneless, skinless chicken breast. Lean protein source, perfect for grilling or baking.",
    category: "MEAT",
    pricePerUnit: 7.49,
    weightPerUnit: 0.5,
    quantityOnHand: 22
  }
];

interface ProductGridProps {
  filterCategory?: ProductCategory | 'ALL';
  searchQuery?: string;
}

export default function ProductGrid({ 
  filterCategory = 'ALL', 
  searchQuery = '' 
}: ProductGridProps) {
  
  // Filter products based on category and search query
  const filteredProducts = dummyProducts.filter(product => {
    const matchesCategory = filterCategory === 'ALL' || product.category === filterCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (productId: number, quantity: number) => {
    // This would typically connect to your cart state management
    console.log(`Added ${quantity} of product ${productId} to cart`);
    alert(`Added ${quantity} item(s) to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Products</h2>
        <p className="text-gray-600">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          {filterCategory !== 'ALL' && ` in ${filterCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}