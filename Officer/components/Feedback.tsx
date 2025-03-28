"use client";
import { useEffect, useState } from "react";

interface Feedback {
  _id: string;
  fullName: string;
  email: string;
  feedback: string;
  createdAt: string;
}

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("/api/feedback");
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">User Feedbacks</h2>
      <div className="grid gap-4">
        {feedbacks.map((feedback) => (
          <div
            key={feedback._id}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg">{feedback.fullName}</h3>
              <span className="text-sm text-gray-500">
                {new Date(feedback.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-2">{feedback.email}</p>
            <p className="text-gray-700">{feedback.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback; 