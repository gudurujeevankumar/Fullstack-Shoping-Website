import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleCardClick = () => {
    if (onQuickView) {
      onQuickView(product);
    }
  };

  // Get high-quality product image based on category and product name
  const getProductImage = (product: Product) => {
    // First check for specific product names
    const productNameLower = product.name.toLowerCase();
    
    if (productNameLower.includes('led') && (productNameLower.includes('lamp') || productNameLower.includes('desk'))) {
      return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop';
    }
    
    if (productNameLower.includes('headphone') || productNameLower.includes('earphone')) {
      return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop';
    }

    // Category-based mapping as fallback
    const imageMap: { [key: string]: string } = {
      'Electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
      'Clothing': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
      'Books': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      'Home & Garden': 'https://images.unsplash.com/photo-1586023492125-27b376785b41?w=400&h=300&fit=crop',
      'Sports': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
      'Health & Beauty': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
      'Toys': 'https://images.unsplash.com/photo-1558877385-1b9d7d6b6f36?w=400&h=300&fit=crop',
      'Food': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop'
    };

    return product.image && product.image !== '/placeholder.svg' 
      ? product.image 
      : imageMap[product.category] || 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop';
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white border-0 shadow-md overflow-hidden"
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={getProductImage(product)}
            alt={product.name}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop';
            }}
          />
          
          {/* Overlay with quick view button */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button 
              variant="secondary" 
              size="sm" 
              className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView?.(product);
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              Quick View
            </Button>
          </div>

          {/* Status badges */}
          <div className="absolute top-3 left-3 space-y-1">
            {!product.inStock && (
              <Badge variant="destructive" className="shadow-sm">
                Out of Stock
              </Badge>
            )}
          </div>
          
          <Badge 
            variant="secondary" 
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm shadow-sm"
          >
            {product.category}
          </Badge>
        </div>
        
        <div className="p-5">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviews})</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </div>
            
            <div className="text-sm text-gray-500">
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0">
        <Button 
          className="w-full h-12 text-base font-semibold rounded-xl transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
