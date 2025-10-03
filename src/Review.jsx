import React, { useState } from "react";
import "./Review.css";

const Review = () => {
  const [reviews, setReviews] = useState([
    {
      name: "Jamsheer",
      img: "https://img.freepik.com/free-photo/curry-with-chicken-onions-indian-food-asian-cuisine_2829-4415.jpg",
      rating: 5,
      text: "This is a great product! I love it.",
    },
    {
      name: "Mahesh Iyer",
      img: "https://img.freepik.com/premium-photo/indian-butter-chicken-black-bowl-wooden-table_198067-559042.jpg",
      rating: 4,
      text: "This product is okay. It's not the best, but it's not the worst either.",
    },
    {
      name: "Praveen Kumar",
      img: "https://img.freepik.com/premium-photo/bucket-full-crispy-kentucky-fried-chicken-with-smoke-barbecue-sauce-brown-background-selective-focus_70216-5721.jpg",
      rating: 5,
      text: "I've tried a lot of fried chicken recipes before, but this one is definitely my new favorite!",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, text: "" });

  const handleSubmit = () => {
    if (!newReview.name || !newReview.text) {
      alert("Please fill out all fields!");
      return;
    }
    setReviews([...reviews, newReview]);
    setNewReview({ name: "", rating: 5, text: "" });
    setShowModal(false);
  };

  return (
   <div id="Review" className="review-section">
  <h2 className="review-title">⭐ Customer Reviews</h2>
      <div className="review-container">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <div className="review-header">
              <img src={review.img} alt={review.name} />
              <div>
                <h3>{review.name}</h3>
                <span>{"⭐".repeat(review.rating)} ({review.rating}/5)</span>
              </div>
            </div>
            <div className="review-body">
              <p>{review.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Button */}
      <button className="add-review-btn" onClick={() => setShowModal(true)}>
        ➕ Add Review
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Your Review</h3>
            <input
              type="text"
              placeholder="Your Name"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
            />
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
            >
              <option value="1">1/5 ⭐</option>
              <option value="2">2/5 ⭐⭐</option>
              <option value="3">3/5 ⭐⭐⭐</option>
              <option value="4">4/5 ⭐⭐⭐⭐</option>
              <option value="5">5/5 ⭐⭐⭐⭐⭐</option>
            </select>
            <textarea
              placeholder="Write your review..."
              rows="4"
              value={newReview.text}
              onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
            ></textarea>

            <div className="modal-actions">
              <button className="close-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="submit-btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
