import { destinationQueries } from "@/db/repository/destination";
import { vowQueries } from "@/db/repository/vow";
import AddVowButton from "./Button";
import VowCard from "./Card";

export default function VowsPage() {
  const vows = vowQueries.getAll();
  const destinations = destinationQueries.getAll();

  // Serialize vows with destination names
  const serializedVows = vows.map((vow) => {
    const destination = destinations.find((d) => d.id === vow.destination_id);
    return {
      id: vow.id,
      userName: vow.user_name,
      destinationName: destination?.name ?? "Unknown Destination",
      targetVisitDate: vow.target_visit_date ?? undefined,
      status: vow.status,
      createdAt: vow.created_at,
    };
  });

  // Serialize destinations for the modal
  const serializedDestinations = destinations.map((dest) => ({
    id: dest.id,
    name: dest.name,
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Travel Vows
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Promises to visit amazing destinations
            </p>
          </div>
          <AddVowButton destinations={serializedDestinations} />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium whitespace-nowrap">
            All Vows
          </button>
          <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap">
            Pending
          </button>
          <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap">
            Completed
          </button>
        </div>

        {/* Vows List */}
        {serializedVows.length === 0 ? (
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No vows yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Make your first vow to visit an amazing destination!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serializedVows.map((vow) => (
              <VowCard
                key={vow.id}
                id={vow.id}
                userName={vow.userName}
                destinationName={vow.destinationName}
                targetVisitDate={vow.targetVisitDate}
                status={vow.status}
                createdAt={vow.createdAt}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
