
import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import ProductModal from "@/components/ProductModal";
import Cart from "@/components/Cart";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/hooks/useProducts";
import { Loader2, ShoppingBag } from "lucide-react";

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const { products, loading: productsLoading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  if (authLoading || productsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header onCartOpen={() => setIsCartOpen(true)} />
        <Hero />
        <div className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center items-center space-x-3 mb-4">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-800">Loading Products...</h2>
              </div>
              <p className="text-gray-600">Fetching the latest products for you</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-56 w-full rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header onCartOpen={() => setIsCartOpen(true)} />
        <Hero />
        <div className="py-16 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Something went wrong</h2>
              <p className="text-gray-600 mb-8">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header onCartOpen={() => setIsCartOpen(true)} />
      
      <main>
        <Hero />
        
        {user && (
          <>
            <section className="py-8 px-4">
              <div className="container mx-auto">
                <ProductFilter 
                  products={products}
                  onFilterChange={setFilteredProducts}
                />
              </div>
            </section>
            
            <section className="py-16 px-4">
              <div className="container mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Discover our carefully curated collection of premium products
                  </p>
                </div>
                
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ShoppingBag className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">No products found</h3>
                    <p className="text-gray-600 text-lg">Try adjusting your filters to see more products.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onQuickView={setSelectedProduct}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Index;
