// app/vows/new/page.tsx
import BackButton from "@/components/Buttons/Back";
import CreateVowForm from "@/components/Vow/Form";
import { destinationQueries } from "@/db/repository/destination";
import Link from "next/link";

export default function NewVowPage() {
  const destinations = destinationQueries.getAll();

  // Serialize destinations
  const serializedDestinations = destinations.map((dest) => ({
    id: dest.id,
    name: dest.name,
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <BackButton />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Make a Vow
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Promise yourself to visit an amazing destination
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
          {destinations.length === 0 ? (
            <div className="text-center py-12">
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
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No destinations available
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Add some destinations first before making a vow
              </p>
              <Link
                href="/destinations"
                className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Go to Destinations
              </Link>
            </div>
          ) : (
            <CreateVowForm destinations={serializedDestinations} />
          )}
        </div>

        {/* Info Box */}
        {destinations.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <p className="font-medium mb-1">What is a vow?</p>
                <p>
                  A vow is your personal commitment to visit a destination. Set
                  a target date and track your progress as you turn your travel
                  dreams into reality!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
