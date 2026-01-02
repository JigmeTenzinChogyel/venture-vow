// components/VowCard.tsx
import Link from "next/link";
import { VowStatus } from "@/db/models/vows";

type VowCardProps = {
  id: number;
  userName: string;
  destinationName: string;
  targetVisitDate?: string;
  status: VowStatus;
  createdAt: string;
};

const statusColors = {
  [VowStatus.Pending]:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  [VowStatus.Completed]:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  [VowStatus.Cancelled]:
    "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
};

export default function VowCard({
  id,
  userName,
  destinationName,
  targetVisitDate,
  status,
  createdAt,
}: VowCardProps) {
  return (
    <Link
      href={`/vows/${id}`}
      className="group block bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-orange-500"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors">
            {destinationName}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            by {userName}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
        >
          {status}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm">
        {targetVisitDate && (
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Target: {new Date(targetVisitDate).toLocaleDateString()}
          </div>
        )}
        <div className="flex items-center text-gray-500 dark:text-gray-500 text-xs">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Created {new Date(createdAt).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
}
