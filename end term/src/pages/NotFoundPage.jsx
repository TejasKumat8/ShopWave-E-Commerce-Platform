import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="container-custom py-20 text-center">
      <h1 className="text-5xl font-bold mb-6">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-10 max-w-md mx-auto">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary px-6 py-3">
        Return to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;