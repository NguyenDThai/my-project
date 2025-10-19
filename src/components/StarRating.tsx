import React from "react";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex justify-center gap-1 mb-3">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`text-lg ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
