-- This data base is now in supabase that logedin with github account

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT,
  stock_quantity INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table  
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT,
  products JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to view products (public access)
CREATE POLICY "Allow public read access to products" 
  ON public.products 
  FOR SELECT 
  USING (true);

-- Add Row Level Security (RLS) to orders table
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies for orders (users can only see their own orders)
CREATE POLICY "Users can view their own orders" 
  ON public.orders 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" 
  ON public.orders 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Insert sample products data
INSERT INTO public.products (name, description, price, image_url, category, stock_quantity) VALUES
('Wireless Headphones', 'Premium noise-cancelling wireless headphones with 30-hour battery life', 199.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', 'Electronics', 50),
('Smart Watch', 'Advanced fitness tracking with heart rate monitor and GPS', 299.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', 'Electronics', 30),
('Coffee Mug', 'Ceramic coffee mug with ergonomic handle and heat retention', 24.99, 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500', 'Home & Garden', 100),
('Laptop Backpack', 'Water-resistant laptop backpack with multiple compartments', 89.99, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', 'Accessories', 25),
('Smartphone', 'Latest model smartphone with advanced camera and fast processor', 699.99, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500', 'Electronics', 15),
('Running Shoes', 'Lightweight running shoes with advanced cushioning technology', 129.99, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 'Sports', 40),
('Desk Lamp', 'LED desk lamp with adjustable brightness and USB charging port', 49.99, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500', 'Home & Garden', 60),
('Bluetooth Speaker', 'Portable waterproof Bluetooth speaker with rich bass', 79.99, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500', 'Electronics', 35);
