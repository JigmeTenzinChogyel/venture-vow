export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="w-full sm:w-auto">
            <div className="h-10 w-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg mb-2" />
            <div className="h-6 w-96 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
          </div>
          <div className="h-12 w-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md"
            >
              {/* Image skeleton */}
              <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse" />
              {/* Content skeleton */}
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
