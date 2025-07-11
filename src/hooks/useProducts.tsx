
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching products:', error);
          setError('Failed to fetch products');
          return;
        }

        // Transform Supabase data to match our Product interface
        const transformedProducts: Product[] = data.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description || '',
          price: Number(product.price),
          image: product.image_url || '/placeholder.svg',
          category: product.category || 'Uncategorized',
          rating: 4.5, // Default rating since we don't have ratings in DB yet
          reviews: Math.floor(Math.random() * 100) + 10, // Random reviews for now
          inStock: (product.stock_quantity || 0) > 0,
        }));

        setProducts(transformedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
