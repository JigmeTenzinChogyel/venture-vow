// components/VowStatusUpdater.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VowStatus } from "@/db/models/vows";

type VowStatusUpdaterProps = {
  vowId: number;
  currentStatus: VowStatus;
};

export default function VowStatusUpdater({
  vowId,
  currentStatus,
}: VowStatusUpdaterProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: VowStatus) => {
    if (newStatus === currentStatus) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/vows/${vowId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <select
      value={currentStatus}
      onChange={(e) => handleStatusChange(e.target.value as VowStatus)}
      disabled={isUpdating}
      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <option value={VowStatus.Pending}>Pending</option>
      <option value={VowStatus.Completed}>Completed</option>
      <option value={VowStatus.Cancelled}>Cancelled</option>
    </select>
  );
}
