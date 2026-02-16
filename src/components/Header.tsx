
import React from 'react';
import { ShoppingCart, Search, Menu, Bell, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { usePWA } from '@/hooks/usePWA';
import { useNotifications } from '@/hooks/useNotifications';
import { useAuth } from '@/hooks/useAuth';
import UserMenu from '@/components/UserMenu';

interface HeaderProps {
  onCartOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartOpen }) => {
  const { getItemCount } = useCart();
  const { isInstallable, installApp } = usePWA();
  const { permission, requestPermission } = useNotifications();
  const { user } = useAuth();
  
  const itemCount = getItemCount();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">JK</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Jeevan Kumar Store
                </h1>
                <p className="text-xs text-gray-500">Premium Quality Products</p>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {permission === 'default' && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={requestPermission}
                className="hidden sm:flex hover:bg-blue-50 transition-colors"
              >
                <Bell className="h-5 w-5" />
              </Button>
            )}
            
            {isInstallable && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={installApp}
                className="hidden sm:flex hover:bg-blue-50 transition-colors"
              >
                <Download className="h-5 w-5" />
              </Button>
            )}

            <Button variant="ghost" size="icon" className="md:hidden hover:bg-blue-50 transition-colors">
              <Search className="h-5 w-5" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-blue-50 transition-colors group"
              onClick={onCartOpen}
            >
              <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {itemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0 animate-pulse"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>

            {/* Authentication */}
            {user ? (
              <UserMenu />
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="hover:bg-blue-50 transition-colors">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
