// Simulated API functions for products
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Get all products (uses posts from JSONPlaceholder as product data)
export async function getProducts() {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    if (!response.ok) throw new Error('Failed to fetch products');
    
    const posts = await response.json();
    
    // Transform the posts into products
    return posts.map(post => ({
      id: post.id,
      title: post.title,
      description: post.body,
      price: (post.id * 9.99).toFixed(2),
      image: `https://picsum.photos/seed/${post.id}/400/300`,
      category: ['Electronics', 'Clothing', 'Home', 'Books'][post.id % 4],
      rating: (3 + Math.random() * 2).toFixed(1),
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Get a single product by ID
export async function getProductById(id) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch product ${id}`);
    
    const post = await response.json();
    
    // Transform the post into a product with more details
    return {
      id: post.id,
      title: post.title,
      description: post.body,
      price: (post.id * 9.99).toFixed(2),
      image: `https://picsum.photos/seed/${post.id}/800/600`,
      category: ['Electronics', 'Clothing', 'Home', 'Books'][post.id % 4],
      rating: (3 + Math.random() * 2).toFixed(1),
      stock: Math.floor(Math.random() * 100) + 1,
      features: [
        'High quality materials',
        'Durable and long-lasting',
        'Modern design',
        'Satisfaction guaranteed'
      ],
      specifications: {
        weight: `${(Math.random() * 2 + 0.5).toFixed(1)} kg`,
        dimensions: `${Math.floor(Math.random() * 30 + 10)}cm x ${Math.floor(Math.random() * 20 + 10)}cm x ${Math.floor(Math.random() * 10 + 2)}cm`,
        color: ['Black', 'White', 'Silver', 'Blue', 'Red'][post.id % 5],
        material: ['Plastic', 'Metal', 'Wood', 'Fabric', 'Leather'][post.id % 5],
      }
    };
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

// Get product reviews (simulated)
export async function getProductReviews(productId) {
  try {
    const response = await fetch(`${BASE_URL}/comments?postId=${productId}`);
    if (!response.ok) throw new Error(`Failed to fetch reviews for product ${productId}`);
    
    const comments = await response.json();
    
    // Transform comments into reviews
    return comments.map(comment => ({
      id: comment.id,
      productId,
      username: comment.email.split('@')[0],
      rating: Math.floor(Math.random() * 3) + 3, // 3-5 star ratings
      comment: comment.body,
      date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(), // Random date in last 90 days
    }));
  } catch (error) {
    console.error(`Error fetching reviews for product ${productId}:`, error);
    return [];
  }
}