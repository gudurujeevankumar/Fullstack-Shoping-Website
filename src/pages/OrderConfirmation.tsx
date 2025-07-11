
import React, { useEffect } from 'react';
import { CheckCircle, Package, Truck, Home, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const orderNumber = `JK-${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-2xl border-0">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-green-600 mb-2">
            Order Placed Successfully!
          </CardTitle>
          <div className="flex justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Thank you for choosing Jeevan Kumar Store!
            </h3>
            <p className="text-gray-600 mb-3">
              Your order has been received and is being processed.
            </p>
            <div className="inline-block bg-white px-4 py-2 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Order Number:</p>
              <p className="font-bold text-lg text-blue-600">{orderNumber}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-green-800">Order Confirmed</p>
                <p className="text-sm text-green-600">We're preparing your items with care</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-blue-800">Processing</p>
                <p className="text-sm text-blue-600">Your order is being carefully packed</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-700">Shipping Soon</p>
                <p className="text-sm text-gray-500">We'll notify you when it's on the way</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-gray-200">
            <Button 
              className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200" 
              onClick={() => navigate('/')}
            >
              <Home className="h-5 w-5 mr-2" />
              Continue Shopping
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-12 text-base font-semibold rounded-xl border-2 hover:bg-gray-50 transition-colors"
              onClick={() => navigate('/orders')}
            >
              View Order Details
            </Button>
          </div>

          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Questions? Contact us at{' '}
              <a href="mailto:support@jeevankumarstore.com" className="text-blue-600 hover:underline">
                support@jeevankumarstore.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderConfirmation;
