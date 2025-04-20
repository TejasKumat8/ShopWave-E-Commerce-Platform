function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="ml-3 text-lg font-medium text-gray-700">Loading...</p>
    </div>
  );
}

export default LoadingSpinner;