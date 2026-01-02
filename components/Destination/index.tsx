import { destinationQueries } from "@/db/repository/destination";
import AddDestinationButton from "./Button";
import DestinationCard from "./Card";

export default function DestinationsPage() {
  const destinations = destinationQueries.getAll();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Explore Destinations
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Discover amazing places to visit and make your vow
            </p>
          </div>
          <AddDestinationButton />
        </div>

        {/* Destinations Grid */}
        {destinations.length == 0 ? (
          <div className="text-center py-16">
            <svg
              className="w-24 h-24 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No destinations yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Be the first to add a destination!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                id={destination.id}
                name={destination.name}
                description={destination.description}
                image_url={destination.image_url}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
