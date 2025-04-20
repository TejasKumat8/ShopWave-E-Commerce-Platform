import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getProductReviews } from '../api/productsApi';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addItem } = useCart();
  
  useEffect(() => {
    async function fetchProductDetails() {
      setIsLoading(true);
      try {
        const productData = await getProductById(id);
        setProduct(productData);
        
        const reviewsData = await getProductReviews(id);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProductDetails();
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      // Add to cart multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="btn-primary">
          Return to Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-12">
      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm">
        <Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to="/products" className="text-gray-500 hover:text-primary-600">Products</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900 font-medium">{product.title}</span>
      </nav>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Product Info */}
        <div>
          <span className="inline-block text-sm font-medium uppercase text-primary-600 mb-2">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-600">{product.rating} out of 5</span>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-600">{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</span>
          </div>
          
          {/* Price */}
          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            <div className="flex items-center mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.stock > 10 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
              </span>
              {product.stock > 0 && (
                <span className="ml-2 text-sm text-gray-500">
                  {product.stock} {product.stock === 1 ? 'unit' : 'units'} available
                </span>
              )}
            </div>
          </div>
          
          {/* Short Description */}
          <p className="text-gray-700 mb-6">
            {product.description}
          </p>
          
          {/* Quantity and Add to Cart */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <label htmlFor="quantity" className="font-medium">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-12 py-1 text-center border-none focus:outline-none focus:ring-0"
                />
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={handleAddToCart} 
                className="btn-primary flex-1 py-3"
                disabled={product.stock <= 0}
              >
                Add to Cart
              </button>
              <button className="btn-outline px-4 py-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Additional info */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex text-sm space-x-4 mb-4">
              <button 
                className={`pb-2 font-medium border-b-2 ${activeTab === 'description' ? 'text-primary-600 border-primary-600' : 'text-gray-500 border-transparent'}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`pb-2 font-medium border-b-2 ${activeTab === 'features' ? 'text-primary-600 border-primary-600' : 'text-gray-500 border-transparent'}`}
                onClick={() => setActiveTab('features')}
              >
                Features
              </button>
              <button 
                className={`pb-2 font-medium border-b-2 ${activeTab === 'specs' ? 'text-primary-600 border-primary-600' : 'text-gray-500 border-transparent'}`}
                onClick={() => setActiveTab('specs')}
              >
                Specifications
              </button>
            </div>
            
            <div className="text-gray-700">
              {activeTab === 'description' && (
                <p>{product.description}</p>
              )}
              
              {activeTab === 'features' && (
                <ul className="list-disc pl-5 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              )}
              
              {activeTab === 'specs' && (
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2">
                      <span className="font-medium text-gray-600 capitalize">{key}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
        
        {reviews.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600 mb-4">There are no reviews for this product yet.</p>
            <button className="btn-primary">Be the first to review</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{review.username}</h3>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;