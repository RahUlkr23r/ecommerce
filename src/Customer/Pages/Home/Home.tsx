import React, { useEffect, useState } from 'react';
import ElectricCategory from './ElectricCategory';
import Deal from './Deal/DealHomePage';
import CategoryGrid from './CategoryGrid/CategoryGrid';
import ShopByCategory from './ShopByCategory/ShopByCategory';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
   const navigate=useNavigate()
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="homepage overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute top-1/4 -left-20 w-96 h-96 bg-green-100 rounded-full opacity-10 mix-blend-multiply filter blur-3xl animate-blob"
          style={{ transform: `translate(${scrollPosition * 0.02}px, ${scrollPosition * 0.01}px)` }}
        ></div>
        <div 
          className="absolute top-1/3 -right-20 w-96 h-96 bg-blue-100 rounded-full opacity-10 mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"
          style={{ transform: `translate(${-scrollPosition * 0.02}px, ${scrollPosition * 0.015}px)` }}
        ></div>
        <div 
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-100 rounded-full opacity-10 mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"
          style={{ transform: `translate(${scrollPosition * 0.01}px, ${-scrollPosition * 0.02}px)` }}
        ></div>
      </div>

      <main className="relative space-y-8 lg:space-y-12">
        {/* Hero / Electric Category */}
        <section className="relative overflow-hidden">
          <ElectricCategory />
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none"></div>
        </section>

        {/* Explore Collections */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
          <div className="absolute -z-10 right-0 top-0 w-1/2 h-full bg-gradient-to-l from-green-50 to-transparent opacity-50"></div>
          <header className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <span className="relative inline-block">
                <span className="relative z-10">Explore Our Collections</span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-green-100/60 z-0"></span>
              </span>
            </h2>
            <p className="mt-2 text-lg text-gray-600">Discover products curated just for you</p>
          </header>
          <CategoryGrid />
        </section>

        {/* Hot Deals Section */}
        <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]"></div>
          </div>
          <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <header className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
                  Hot Deals
                </span>
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
                Limited time offers on our most popular items
              </p>
            </header>
            <Deal />
          </div>
        </section>

        {/* Shop By Category */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
          <div className="absolute -z-10 left-0 top-0 w-1/2 h-full bg-gradient-to-r from-blue-50 to-transparent opacity-50"></div>
          <ShopByCategory />
        </section>

        {/* Seller Promo Banner */}
        <section className="relative bg-gradient-to-b from-white to-green-50 py-16 sm:py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5f1bc76a…/628b8f5d…_noise-pattern.png')] opacity-5"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div>
                <span className="inline-block px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full mb-4">
                  For Businesses
                </span>
                <h3 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-gray-900 leading-tight">
                  Grow Your Business <span className="text-green-600">With Us</span>
                </h3>
                <p className="mt-6 text-lg leading-relaxed text-gray-600">
                  Join thousands of successful sellers. Get access to tools, support, and an engaged audience to scale your brand.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <a
                  
                    className="relative inline-flex items-center justify-center px-8 py-4 text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl group overflow-hidden"
                  >
                    <span className="relative z-10"   onClick={() => navigate("/become-seller")} >Start Selling Today</span>
                    <svg className="ml-2 w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center text-base font-medium text-green-700 hover:text-green-800 group"
                  >
                    <span className="relative z-10"                   onClick={() => navigate("/seller-guide")} 
 >How it works</span>
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-200 group-hover:bg-green-300 transition-colors"></span>
                  </a>
                </div>

                {/* Trust Points */}
                <div className="mt-12 grid grid-cols-2 gap-4">
                  {[
                    { label: 'No setup fees', icon: '💰' },
                    { label: '24/7 support', icon: '🛟' },
                    { label: 'Fast payouts', icon: '⚡' },
                    { label: 'Marketing tools', icon: '📈' }
                  ].map(({ label, icon }, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="text-2xl mr-3">{icon}</span>
                      <span className="text-gray-700">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seller Banner Image */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl relative transform hover:-translate-y-1 transition-transform duration-300">
                  <img
                    className="w-full h-auto object-cover"
                    src="https://img.freepik.com/premium-photo/banner-design-take-your-shop-online-through-digital-marketing-template_1029476-62593.jpg"
                    alt="Start selling online"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Seller avatars */}
                <div className="absolute -bottom-4 -right-4 bg-white px-4 py-3 rounded-xl shadow-lg hidden lg:block border border-gray-100">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <img
                          key={i}
                          className="w-10 h-10 rounded-full border-2 border-white"
                          src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg`}
                          alt="Seller"
                        />
                      ))}
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-gray-500">Join our community of</p>
                      <p className="text-sm font-medium text-gray-900">5,000+ Sellers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="relative py-16 px-4 sm:px-6 lg:py-20 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5f1bc76a…/628b8f5d…_noise-pattern.png')]"></div>
          </div>
          <div className="relative max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Stay Updated With Our <span className="text-green-400">Best Offers</span>
            </h2>
            <p className="mt-4 max-w-md mx-auto text-lg text-gray-300 sm:text-xl md:mt-5 md:text-xl md:max-w-3xl">
              Subscribe to our newsletter and get <span className="font-semibold text-green-300">10% off</span> your first order.
            </p>

            <form className="mt-8 flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto sm:max-w-xl">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-5 py-3.5 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-8 py-3.5 text-base font-medium rounded-lg text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg hover:shadow-xl transition-all"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-4 text-sm text-gray-400">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;