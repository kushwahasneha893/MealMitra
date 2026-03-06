import React, { useState } from "react";
import axios from "axios";

const FeedbackModal = ({ orderId, close, refreshOrders }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitFeedback = async () => {
    try {
      if (!orderId) {
        alert("Order ID missing ❌");
        console.error("❌ Order ID is:", orderId);
        return;
      }

      if (rating === 0) {
        alert("Please select a rating");
        return;
      }

      if (!comment || comment.trim() === "") {
        alert("Please write a comment");
        return;
      }

      const token = localStorage.getItem("token");

      const payload = {
        orderId: Number(orderId),
        rating: Number(rating),
        comment: comment.trim()
      };

      console.log("🔥 Submitting feedback with payload:", payload);

      setLoading(true);

      const response = await axios.post(
        "http://localhost:9999/api/customer/feedback",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      console.log("✅ Feedback submitted successfully:", response.data);
      
      // Close modal first
      close();
      
      // Show success message
      alert("✅ Feedback submitted successfully!");
      
      // Refresh orders to update the list
      if (refreshOrders) {
        refreshOrders();
      }

    } catch (err) {
      console.error("❌ Feedback submission error:", err);
      console.error("❌ Error response:", err.response?.data);
      console.error("❌ Error status:", err.response?.status);
      
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error ||
                          err.message || 
                          "Failed to submit feedback";
      
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg relative">
        
        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          ⭐ Rate Your Experience
        </h2>

        <p className="text-center mb-3 text-gray-600">Order ID: {orderId}</p>

        {/* Star rating */}
        <div className="flex gap-2 mb-4 justify-center">
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              className={`text-4xl cursor-pointer transition-colors ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Comment textarea */}
        <textarea
          placeholder="Write feedback..."
          className="w-full border p-3 rounded-lg resize-none"
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Submit button */}
        <button
          onClick={submitFeedback}
          disabled={loading}
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;