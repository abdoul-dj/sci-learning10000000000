export default function SkeletonPage() {
  return (
    <div className="animate-pulse">

      {/* Navbar Skeleton */}
      <div className="h-20 w-full border-b flex items-center px-6 space-x-6">
        <div className="h-10 w-32 bg-gray-300 rounded"></div>

        <div className="flex items-center space-x-4 ml-auto">
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
          <div className="h-6 w-20 bg-gray-300 rounded"></div>
          <div className="h-6 w-16 bg-gray-300 rounded"></div>

          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex justify-between px-10 py-16">

        {/* Left Text Section */}
        <div className="space-y-4 w-1/2">

          {/* Big Title */}
          <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-8 w-2/3 bg-gray-300 rounded"></div>

          {/* Paragraph */}
          <div className="h-4 w-full bg-gray-300 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-300 rounded"></div>

          {/* Button */}
          <div className="h-10 w-32 bg-gray-300 rounded"></div>

          {/* Search bar */}
          <div className="h-12 w-full max-w-xl bg-gray-300 rounded"></div>
        </div>

        {/* Right Image Placeholder */}
        <div className="w-1/3 h-80 bg-gray-300 rounded-lg"></div>
      </div>

      {/* Categories Bar */}
      <div className="w-full px-10 py-6">
        <div className="flex space-x-6 overflow-x-auto">
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
          <div className="h-6 w-20 bg-gray-300 rounded"></div>
          <div className="h-6 w-20 bg-gray-300 rounded"></div>
          <div className="h-6 w-20 bg-gray-300 rounded"></div>
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
          <div className="h-6 w-20 bg-gray-300 rounded"></div>
          <div className="h-6 w-20 bg-gray-300 rounded"></div>
          <div className="h-6 w-20 bg-gray-300 rounded"></div>
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
        </div>
      </div>

    </div>
  );
}
