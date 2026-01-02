"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Vow {
  id: number;
  title: string;
  description: string;
  deadline: string;
  author_name: string;
  status: "active" | "completed" | "failed";
  created_at: string;
}

export default function HomePage() {
  const [vows, setVows] = useState<Vow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    author_name: "",
    author_email: "",
  });

  useEffect(() => {
    fetchVows();
  }, []);

  const fetchVows = async () => {
    try {
      const res = await fetch("/api/vows");
      const data = await res.json();
      setVows(data);
    } catch (error) {
      console.error("Error fetching vows:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/vows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({
          title: "",
          description: "",
          deadline: "",
          author_name: "",
          author_email: "",
        });
        setShowForm(false);
        fetchVows();
      }
    } catch (error) {
      console.error("Error creating vow:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getDaysRemaining = (deadline: string) => {
    const days = Math.ceil(
      (new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );
    return days;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            VentureVow
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Make your entrepreneurial commitments public. Stay accountable.
          </p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            {showForm ? "Cancel" : "Make a Vow"}
          </button>
        </div>

        {/* Create Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-purple-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Create Your Vow
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.author_name}
                  onChange={(e) =>
                    setFormData({ ...formData, author_name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={formData.author_email}
                  onChange={(e) =>
                    setFormData({ ...formData, author_email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vow Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Launch my SaaS product"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
                  placeholder="I vow to build and launch my SaaS product with at least 100 beta users..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline *
                </label>
                <input
                  type="date"
                  required
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData({ ...formData, deadline: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Make This Vow Public
              </button>
            </form>
          </div>
        )}

        {/* Vows List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : vows.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <p className="text-gray-500 text-lg">
                No vows yet. Be the first to make one!
              </p>
            </div>
          ) : (
            vows.map((vow) => (
              <Link href={`/vow/${vow.id}`} key={vow.id}>
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {vow.title}
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {vow.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        by {vow.author_name}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(vow.status)}`}
                    >
                      {vow.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-500">
                      Deadline: {new Date(vow.deadline).toLocaleDateString()}
                    </div>
                    {vow.status === "active" && (
                      <div
                        className={`font-medium ${getDaysRemaining(vow.deadline) < 0 ? "text-red-600" : "text-blue-600"}`}
                      >
                        {getDaysRemaining(vow.deadline) < 0
                          ? `${Math.abs(getDaysRemaining(vow.deadline))} days overdue`
                          : `${getDaysRemaining(vow.deadline)} days remaining`}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
