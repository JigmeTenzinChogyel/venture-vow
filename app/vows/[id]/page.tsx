import { destinationQueries } from "@/db/repository/destination";
import { notFound } from "next/navigation";
import Link from "next/link";
import { VowStatus } from "@/db/models/vows";
import { vowQueries } from "@/db/repository/vow";
import { visitQueries } from "@/db/repository/visit";
import VowStatusUpdater from "@/components/Vow/Updater";

type PageProps = {
  params: Promise<{ id: string }>;
};

const statusColors = {
  [VowStatus.Pending]:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  [VowStatus.Completed]:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  [VowStatus.Cancelled]:
    "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
};

export default async function VowDetailPage({ params }: PageProps) {
  const { id } = await params;
  const vow = vowQueries.getById(Number(id));

  if (!vow) {
    notFound();
  }

  const destination = destinationQueries.getById(vow.destination_id);
  const visits = visitQueries.getByVow(Number(id));

  // Serialize visits
  const serializedVisits = visits.map((visit) => ({
    id: visit.id,
    visitDate: visit.visit_date,
    photos: visit.photos ?? undefined,
    rating: visit.rating ?? undefined,
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/vows"
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
          Back to Vows
        </Link>

        {/* Vow Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 mb-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {destination?.name ?? "Unknown Destination"}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                by {vow.user_name}
              </p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[vow.status]}`}
            >
              {vow.status}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Target Visit Date
                </h3>
                <p className="text-lg text-gray-900 dark:text-white">
                  {vow.target_visit_date
                    ? new Date(vow.target_visit_date).toLocaleDateString()
                    : "Not set"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Created
                </h3>
                <p className="text-lg text-gray-900 dark:text-white">
                  {new Date(vow.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Total Visits
                </h3>
                <p className="text-lg text-gray-900 dark:text-white">
                  {visits.length}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Status
                </h3>
                <VowStatusUpdater vowId={vow.id} currentStatus={vow.status} />
              </div>
            </div>
          </div>

          {/* Destination Link */}
          {destination && (
            <Link
              href={`/destinations/${destination.id}`}
              className="inline-flex items-center text-orange-600 hover:text-orange-700 dark:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors"
            >
              View destination details
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          )}
        </div>

        {/* Visits Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Visits
            </h2>
            {/* <Link */}
            {/*   href={`/visits/new?vow_id=${vow.id}`} */}
            {/*   className="px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors text-sm" */}
            {/* > */}
            {/*   Add Visit */}
            {/* </Link> */}
          </div>

          {serializedVisits.length === 0 ? (
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-gray-600 dark:text-gray-400">
                No visits recorded yet. Add your first visit!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {serializedVisits.map((visit) => (
                <div
                  key={visit.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {new Date(visit.visitDate).toLocaleDateString()}
                      </h3>
                      {visit.rating && (
                        <div className="flex items-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${i < visit.rating!
                                  ? "text-yellow-400"
                                  : "text-gray-300 dark:text-gray-600"
                                }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {visit.photos && (
                    <div className="text-sm text-gray-500 dark:text-gray-500">
                      📷 {visit.photos.split(",").length} photo(s)
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
