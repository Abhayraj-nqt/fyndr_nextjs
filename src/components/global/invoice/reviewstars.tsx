import React from "react";

type ReviewStarsPorps = {
  disable: boolean;
  rating: number;
  onStarsClick?: () => void;
  onChange?: () => void;
};

const ReviewStars: React.FC<ReviewStarsPorps> = ({
  disable,
  rating,
  onStarsClick,
}) => {
  return <div>ReviewStars</div>;
};

export default ReviewStars;
