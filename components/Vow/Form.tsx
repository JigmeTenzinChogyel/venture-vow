// components/CreateVowForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Destination = {
  id: number;
  name: string;
};

type CreateVowFormProps = {
  destinations: Destination[];
};

export default function CreateVowForm({ destinations }: CreateVowFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    destination_id: "",
    user_name: "",
    target_visit_date: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/vows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination_id: Number(formData.destination_id),
          user_name: formData.user_name,
          target_visit_date: formData.target_visit_date || undefined,
        }),
      });

      if (response.ok) {
        const newVow = await response.json();
        router.push(`/vows/${newVow.id}`);
      } else {
        alert("Failed to create vow");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error creating vow:", error);
      alert("Failed to create vow");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* User Name */}
      <div>
        <label
          htmlFor="user_name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Your Name *
        </label>
        <input
          type="text"
          id="user_name"
          required
          value={formData.user_name}
          onChange={(e) =>
            setFormData({ ...formData, user_name: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="Enter your name"
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          This will be displayed with your vow
        </p>
      </div>

      {/* Destination */}
      <div>
        <label
          htmlFor="destination_id"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Destination *
        </label>
        <select
          id="destination_id"
          required
          value={formData.destination_id}
          onChange={(e) =>
            setFormData({ ...formData, destination_id: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select a destination</option>
          {destinations.map((dest) => (
            <option key={dest.id} value={dest.id}>
              {dest.name}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Choose where you want to go
        </p>
      </div>

      {/* Target Visit Date */}
      <div>
        <label
          htmlFor="target_visit_date"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Target Visit Date
        </label>
        <input
          type="date"
          id="target_visit_date"
          value={formData.target_visit_date}
          onChange={(e) =>
            setFormData({ ...formData, target_visit_date: e.target.value })
          }
          min={new Date().toISOString().split("T")[0]}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Optional: When do you plan to visit?
        </p>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-orange-600"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Creating Vow...
            </span>
          ) : (
            "Make Vow"
          )}
        </button>
      </div>
    </form>
  );
}
