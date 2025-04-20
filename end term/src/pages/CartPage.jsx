import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function CartPage() {
  const { items, totalItems, totalPrice, addItem, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [discount, setDiscount] = useState(0);
  
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    
    if (!couponCode) {
      setCouponError('Please enter a coupon code');
      return;
    }
    
    // Simulate coupon validation
    if (couponCode.toLowerCase() === 'discount20') {
      setDiscount(Number(totalPrice || 0) * 0.2);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setDiscount(0);
    }
  };
  
  const handleCheckout = () => {
    if (!user) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };
  
  const getFormattedTotal = () => {
    return (Number(totalPrice || 0) - discount).toFixed(2);
  };
  
  if (items.length === 0) {
    return (
      <div className="container-custom py-12 text-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products" className="btn-primary px-6 py-3">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Cart Items ({totalItems})</h2>
            </div>
            
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex flex-col sm:flex-row py-6 px-6">
                  <div className="flex-shrink-0 sm:mr-6 mb-4 sm:mb-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full sm:w-24 h-24 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          <Link to={`/products/${item.id}`} className="hover:text-primary-600">
                            {item.title}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                      </div>
                      <p className="mt-2 sm:mt-0 text-lg font-medium text-gray-900">
                        ${item.price}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button 
                          onClick={() => removeItem(item)} 
                          className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-12 py-1 text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => addItem(item)} 
                          className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => {
                          // Remove all of this item
                          for (let i = 0; i < item.quantity; i++) {
                            removeItem(item);
                          }
                        }}
                        className="text-sm text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="p-6 border-t border-gray-200">
              <button 
                onClick={clearCart}
                className="text-sm text-red-600 hover:text-red-900 font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${Number(totalPrice || 0).toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">${getFormattedTotal()}</span>
              </div>
            </div>
            
            {/* Coupon Code */}
            <form onSubmit={handleApplyCoupon} className="mt-6">
              <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                Coupon Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="coupon"
                  placeholder="Enter coupon code"
                  className="input flex-1"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button type="submit" className="ml-2 btn-outline">
                  Apply
                </button>
              </div>
              {couponError && (
                <p className="mt-2 text-sm text-red-600">{couponError}</p>
              )}
              {discount > 0 && (
                <p className="mt-2 text-sm text-green-600">Coupon applied successfully!</p>
              )}
            </form>
            
            <button 
              onClick={handleCheckout}
              className="w-full btn-primary py-3 mt-6"
            >
              Proceed to Checkout
            </button>
            
            <div className="mt-4">
              <Link to="/products" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;