
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export const useOrders = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const createOrder = async (items: CartItem[], total: number) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to place an order.",
        variant: "destructive"
      });
      return { success: false, error: "Not authenticated" };
    }

    try {
      setLoading(true);
      
      // Transform cart items to match database format
      const orderProducts = items.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image
      }));

      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            user_email: user.email,
            products: orderProducts,
            total: total,
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error creating order:', error);
        toast({
          title: "Order Failed",
          description: "There was an error placing your order. Please try again.",
          variant: "destructive"
        });
        return { success: false, error: error.message };
      }

      toast({
        title: "Order Placed Successfully!",
        description: `Order #${data.id.slice(-6)} has been placed.`,
      });

      return { success: true, order: data };
    } catch (err) {
      console.error('Error creating order:', err);
      toast({
        title: "Order Failed",
        description: "There was an unexpected error. Please try again.",
        variant: "destructive"
      });
      return { success: false, error: "Unexpected error" };
    } finally {
      setLoading(false);
    }
  };

  const getUserOrders = async () => {
    if (!user) return { success: false, error: "Not authenticated" };

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        return { success: false, error: error.message };
      }

      return { success: true, orders: data };
    } catch (err) {
      console.error('Error fetching orders:', err);
      return { success: false, error: "Unexpected error" };
    }
  };

  return { createOrder, getUserOrders, loading };
};
