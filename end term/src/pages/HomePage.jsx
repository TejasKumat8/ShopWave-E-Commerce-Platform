import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/productsApi';
import ProductCard from '../components/ui/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const products = await getProducts();
        // Get 4 random products as featured
        const randomProducts = products
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setFeaturedProducts(randomProducts);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchFeaturedProducts();
  }, []);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container-custom py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Shop the Latest Trends with ShopWave
            </h1>
            <p className="text-xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Discover a world of quality products at unbeatable prices. 
              From electronics to fashion, we've got everything you need.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/products" className="btn-accent px-8 py-3 text-lg">
                Shop Now
              </Link>
              <a href="#featured" className="btn bg-white text-primary-900 hover:bg-gray-100 px-8 py-3 text-lg">
                View Featured
              </a>
            </div>
          </div>
        </div>
        
        {/* Decorative pattern */}
        <div className="absolute right-0 bottom-0 w-1/3 h-1/2 opacity-10">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <rect x="0" y="0" width="33" height="33" />
            <rect x="33" y="33" width="33" height="33" />
            <rect x="66" y="66" width="33" height="33" />
            <rect x="66" y="0" width="33" height="33" />
            <rect x="0" y="66" width="33" height="33" />
          </svg>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Electronics', 'Clothing', 'Home', 'Books'].map((category) => (
              <Link 
                key={category} 
                to={`/products?category=${category}`}
                className="group rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
              >
                <div className="aspect-w-3 aspect-h-2 bg-gradient-to-br from-primary-500 to-secondary-500 p-8 text-white text-center flex flex-col items-center justify-center">
                  <h3 className="text-xl font-bold mb-2">{category}</h3>
                  <p className="text-sm opacity-90">View Collection</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section id="featured" className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Products</h2>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Link to="/products" className="btn-primary px-8 py-3">
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Customers Say</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: 'Sarah Johnson',
                review: 'ShopWave has become my go-to for all my shopping needs. The quality is amazing and shipping is fast!',
                rating: 5,
              },
              {
                name: 'Michael Chen',
                review: 'Great variety of products and excellent customer service. I had an issue with my order and they resolved it immediately.',
                rating: 5,
              },
              {
                name: 'Emily Rodriguez',
                review: 'The prices are unbeatable and the website is so easy to navigate. Definitely recommend!',
                rating: 4,
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{testimonial.review}</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="bg-gradient-to-r from-secondary-600 to-secondary-800 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover why ShopWave is the best place for all your shopping needs.
          </p>
          <Link to="/products" className="btn-accent px-8 py-3 text-lg inline-block">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;