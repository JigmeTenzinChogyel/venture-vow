// components/AddVowButton.tsx
"use client";

import { useState } from "react";
import AddVowModal from "./Modal";

type Destination = {
  id: number;
  name: string;
};

type AddVowButtonProps = {
  destinations: Destination[];
};

export default function AddVowButton({ destinations }: AddVowButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Make a Vow
      </button>

      <AddVowModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        destinations={destinations}
      />
    </>
  );
}
