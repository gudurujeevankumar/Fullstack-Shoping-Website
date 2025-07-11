
import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and crystal-clear audio quality.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    category: 'Electronics',
    rating: 4.8,
    reviews: 1250,
    inStock: true
  },
  {
    id: '2',
    name: 'Smart Fitness Tracker',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS tracking, and 7-day battery life.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=300&fit=crop',
    category: 'Fitness',
    rating: 4.6,
    reviews: 892,
    inStock: true
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt available in various colors and sizes.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    category: 'Clothing',
    rating: 4.4,
    reviews: 567,
    inStock: true
  },
  {
    id: '4',
    name: 'Professional Camera Lens',
    description: '85mm f/1.8 portrait lens for professional photography with exceptional image quality.',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop',
    category: 'Photography',
    rating: 4.9,
    reviews: 234,
    inStock: false
  },
  {
    id: '5',
    name: 'Ergonomic Office Chair',
    description: 'Adjustable ergonomic chair with lumbar support, perfect for long work sessions and productivity.',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    category: 'Furniture',
    rating: 4.7,
    reviews: 445,
    inStock: true
  },
  {
    id: '6',
    name: 'Smart Home Speaker',
    description: 'Voice-controlled smart speaker with premium sound quality and built-in AI assistant.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    category: 'Electronics',
    rating: 4.5,
    reviews: 1123,
    inStock: true
  },
  {
    id: '7',
    name: 'Yoga Mat Premium',
    description: 'Non-slip premium yoga mat with extra cushioning and eco-friendly materials.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    category: 'Fitness',
    rating: 4.3,
    reviews: 356,
    inStock: true
  },
  {
    id: '8',
    name: 'Leather Laptop Bag',
    description: 'Handcrafted genuine leather laptop bag with multiple compartments and professional design.',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    category: 'Accessories',
    rating: 4.6,
    reviews: 289,
    inStock: true
  }
];

export const categories = [
  'All',
  'Electronics',
  'Fitness',
  'Clothing',
  'Photography',
  'Furniture',
  'Accessories'
];
