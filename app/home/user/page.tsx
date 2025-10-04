import ProductGrid from '../../components/ProductGrid';

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Our Store</h1>
          <p className="text-gray-600">Browse our fresh selection of fruits, vegetables, dairy, and meat products.</p>
        </div>
        
        {/* Product Grid Component */}
        <ProductGrid />
      </div>
    </div>
  );
}
