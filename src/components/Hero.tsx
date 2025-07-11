import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';
const Hero: React.FC = () => {
  return <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10"></div>
      
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Welcome to the Future of
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}Shopping
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
            Experience seamless shopping with our Progressive Web App. 
            Fast, reliable, and works offline.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white hover:bg-white text-gray-950">
              Learn More
            </Button>
          </div>
          
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-blue-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-400">Optimized for speed with instant loading</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure & Safe</h3>
              <p className="text-gray-400">Your data is protected with enterprise-grade security</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-400">Quick shipping to your doorstep</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;