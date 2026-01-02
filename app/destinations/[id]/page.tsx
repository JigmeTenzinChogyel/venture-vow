// app/destinations/[id]/page.tsx
import { destinationQueries } from "@/db/repository/destination";
import { notFound } from "next/navigation";
import Link from "next/link";
import { vowQueries } from "@/db/repository/vow";
import VowCard from "@/components/Vow/Card";
import { VowStatus } from "@/db/models/vows";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DestinationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const destination = destinationQueries.getById(Number(id));

  if (!destination) {
    notFound();
  }

  // Get all vows for this destination
  const vows = vowQueries.getByDestination(Number(id));

  // Serialize vows
  const serializedVows = vows.map((vow) => ({
    id: vow.id,
    userName: vow.user_name,
    destinationName: destination.name,
    targetVisitDate: vow.target_visit_date ?? undefined,
    status: vow.status,
    createdAt: vow.created_at,
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/destinations"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 mb-6 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Destinations
        </Link>

        {/* Destination Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
          {/* Image */}
          {destination.image_url && (
            <div className="h-64 md:h-96 overflow-hidden">
              <img
                src={destination.image_url}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {destination.name}
            </h1>
            {destination.description && (
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                {destination.description}
              </p>
            )}

            {/* Stats */}
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-2xl font-bold text-orange-600">
                  {vows.length}
                </span>
                <p className="text-gray-600 dark:text-gray-400">
                  {vows.length === 1 ? "Vow" : "Vows"}
                </p>
              </div>
              <div>
                <span className="text-2xl font-bold text-orange-600">
                  {vows.filter((v) => v.status === VowStatus.Completed).length}
                </span>
                <p className="text-gray-600 dark:text-gray-400">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vows Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Vows for this Destination
            </h2>
            <Link
              href="/vows/new"
              className="px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors text-sm"
            >
              Make a Vow
            </Link>
          </div>

          {serializedVows.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
              <svg
                className="w-16 h-16 mx-auto text-gray-400 mb-4"
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
              <p className="text-gray-600 dark:text-gray-400">
                No vows yet. Be the first to make a vow!
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
    </div>
  );
}
