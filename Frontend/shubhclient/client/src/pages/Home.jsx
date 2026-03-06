import React, { useState, useEffect } from 'react'
import DeliveryMan from "../../public/images/deliveryimage.png"
import Hero from "../../public/images/hero.png"
import Meal3 from "../../public/images/meal3.png"
import Meal4 from "../../public/images/meal4.png"
import Meal5 from "../../public/images/meal5.png"

function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const homemadeMeals = [
    { id: 1, image: Meal3, name: "Homestyle Comfort Food", description: "Made with love and fresh ingredients" },
    { id: 2, image: Meal4, name: "Traditional Family Recipe", description: "Authentic taste of home cooking" },
    { id: 3, image: Meal5, name: "Healthy Home Kitchen", description: "Nutritious meals prepared daily" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 mt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Delicious
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600"> Homemade </span>
              Meals Delivered to Your Door
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Experience the warmth of home-cooked meals made with fresh, quality ingredients. Order authentic homemade food and enjoy fast, reliable delivery right to your doorstep.
            </p>
          
            <div className="flex gap-8 pt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600">5000+</div>
                <div className="text-gray-600 mt-1">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600">100%</div>
                <div className="text-gray-600 mt-1">Homemade</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600">30min</div>
                <div className="text-gray-600 mt-1">Fast Delivery</div>
              </div>
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative animate-float">
              <img src={Hero} alt="Delicious Homemade Food" className="w-full h-auto drop-shadow-2xl rounded-3xl" />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-2xl">
                    🏠
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Homemade Fresh</div>
                    <div className="text-sm text-gray-600">Cooked Today</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                🚀
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Fast & Reliable</h3>
              <p className="text-gray-600">Swift delivery service ensuring your homemade meals arrive fresh and on time, every single time.</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                🏠
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">100% Homemade</h3>
              <p className="text-gray-600">Authentic home-cooked meals prepared with love, using traditional recipes and fresh ingredients.</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                ✨
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Fresh Daily</h3>
              <p className="text-gray-600">Every meal is freshly prepared daily with quality ingredients, never frozen or pre-made.</p>
            </div>
          </div>
        </div>
      </section>

     

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-br from-orange-100 to-red-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Homemade Meals?</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-5xl mb-4">👨‍🍳</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Home Cooks</h3>
              <p className="text-gray-600">Prepared by experienced home chefs who pour their heart into every dish.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-5xl mb-4">🥬</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fresh Ingredients</h3>
              <p className="text-gray-600">We use only the freshest, locally-sourced ingredients for authentic taste.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-5xl mb-4">💝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Made with Love</h3>
              <p className="text-gray-600">Every meal is prepared with care and attention, just like mom used to make.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hygiene First</h3>
              <p className="text-gray-600">Maintaining the highest standards of cleanliness and food safety.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Fast & Reliable Delivery Service
              </h2>
              <p className="text-xl text-orange-100 leading-relaxed">
                Our dedicated delivery team ensures your homemade meals reach you quickly while maintaining their warmth and freshness. Track your order in real-time and enjoy peace of mind!
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <div className="text-3xl font-bold">30min</div>
                  <div className="text-orange-100">Average Delivery</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <div className="text-3xl font-bold">Hot</div>
                  <div className="text-orange-100">Always Fresh</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-orange-100">Service Available</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <div className="text-3xl font-bold">GPS</div>
                  <div className="text-orange-100">Live Tracking</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={DeliveryMan} 
                alt="Delivery Person" 
                className="w-full h-auto drop-shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Works</span>
          </h2>
          <p className="text-xl text-gray-600">Simple steps to delicious homemade meals</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center group">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              📱
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">1. Browse Menu</h3>
            <p className="text-gray-600">Explore our daily selection of homemade meals</p>
          </div>
          <div className="text-center group">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              🛒
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">2. Place Order</h3>
            <p className="text-gray-600">Select your favorite dishes and checkout</p>
          </div>
          <div className="text-center group">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              👨‍🍳
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">3. We Prepare</h3>
            <p className="text-gray-600">Your meal is freshly cooked with love</p>
          </div>
          <div className="text-center group">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              🚚
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">4. Fast Delivery</h3>
            <p className="text-gray-600">Delivered hot and fresh to your door</p>
          </div>
        </div>
      </section>

     

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-orange-500">HomeChef</h3>
              <p className="text-gray-400">Bringing the warmth of homemade meals to your table, one delivery at a time.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Our Menu</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">F</a>
                <a href="#" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">T</a>
                <a href="#" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">I</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 HomeChef. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Home