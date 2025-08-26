// src/components/CarReviews.jsx
import React, { useState, useEffect } from "react";
import {
  fetchCarReviews,
  submitReview,
  fetchUserBookings,
} from "../services/api";
import { toast } from "react-toastify";
import { FaStar, FaUserCircle } from "react-icons/fa";

const CarReviews = ({ carId, currentUser }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [userHasBooked, setUserHasBooked] = useState(false);
  const [userHasReviewed, setUserHasReviewed] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const reviewsData = await fetchCarReviews(carId);
      setReviews(reviewsData);
      setLoading(false);
    };

    const checkUserStatus = async () => {
      if (currentUser) {
        // Check if user has a booking for this car
        const userBookings = await fetchUserBookings(currentUser.user_id);
        const hasBooked = userBookings.some(
          (b) => b.car_id === parseInt(carId)
        );
        setUserHasBooked(hasBooked);

        // Check if user has already reviewed this car
        const reviewsData = await fetchCarReviews(carId);
        const hasReviewed = reviewsData.some(
          (r) => r.user_id === currentUser.user_id
        );
        setUserHasReviewed(hasReviewed);
      }
    };

    fetchReviews();
    checkUserStatus();
  }, [carId, currentUser]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("You must be logged in to leave a review.");
      return;
    }
    if (newReview.rating === 0) {
      toast.error("Please provide a rating.");
      return;
    }
    try {
      const reviewData = {
        user_id: currentUser.user_id,
        car_id: parseInt(carId),
        rating: newReview.rating,
        comment: newReview.comment,
      };
      await submitReview(reviewData);
      toast.success("Review submitted successfully!");
      setNewReview({ rating: 0, comment: "" });

      // Re-fetch reviews to update the list
      const updatedReviews = await fetchCarReviews(carId);
      setReviews(updatedReviews);
      setUserHasReviewed(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        Customer Reviews ({reviews.length})
      </h3>
      {loading ? (
        <div className="text-center text-gray-500">Loading reviews...</div>
      ) : (
        <div className="space-y-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.review_id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <FaUserCircle className="text-primary text-xl" />
                  <div className="font-semibold text-gray-800">
                    {review.username}
                  </div>
                  <div className="flex items-center text-yellow-400">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
                <div className="text-xs text-gray-400 mt-2">
                  Reviewed on:{" "}
                  {new Date(review.created_at).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No reviews yet. Be the first!
            </p>
          )}
        </div>
      )}

      {/* Review Submission Form */}
      {currentUser && userHasBooked && !userHasReviewed && (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-inner">
          <h4 className="text-xl font-bold text-gray-800 mb-4">
            Leave a Review
          </h4>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="flex items-center space-x-2">
              <label className="text-gray-700">Your Rating:</label>
              <div className="flex text-2xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer transition-colors ${
                      star <= newReview.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                  />
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="comment"
                className="block text-gray-700 font-bold mb-1"
              >
                Your Comment:
              </label>
              <textarea
                id="comment"
                name="comment"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-secondary transition-colors"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CarReviews;
