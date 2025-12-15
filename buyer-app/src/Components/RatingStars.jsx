const RatingStars = ({ rating, maxRating = 5 }) => {
  return (
    <div className="rating-stars">
      {"★".repeat(rating)}
      {"☆".repeat(maxRating - rating)}
    </div>
  );
};

export default RatingStars;
