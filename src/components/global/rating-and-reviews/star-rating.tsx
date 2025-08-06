"use client";

import { Star } from "lucide-react";
import React, { useState, useMemo } from "react";

type Props = {
  /** Total number of stars to display */
  outOf?: number;
  /** Current rating value (supports decimals for half stars) */
  rating?: number;
  /** Whether the component is interactive (clickable) */
  interactive?: boolean;
  /** Callback when rating changes (only called when interactive=true) */
  onRatingChange?: (rating: number) => void;
  /** Size of the stars */
  size?: number;
  /** Whether to allow half-star selections */
  allowHalf?: boolean;
  /** Custom class name */
  className?: string;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether to show rating value as text */
  showValue?: boolean;
  /** Precision for half stars (0.5 for half stars, 0.1 for more precision) */
  precision?: number;
};

type StarType = "empty" | "half" | "full";

const StarRating = ({
  outOf = 5,
  rating = 0,
  interactive = false,
  onRatingChange,
  size = 24,
  allowHalf = true,
  className = "",
  disabled = false,
  showValue = false,
  precision = 0.5,
}: Props) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Clamp rating to valid range
  const clampedRating = Math.max(0, Math.min(rating, outOf));
  const displayRating = hoverRating !== null ? hoverRating : clampedRating;

  const stars = useMemo(() => {
    const starArray: StarType[] = [];

    for (let i = 1; i <= outOf; i++) {
      const starValue = displayRating - (i - 1);

      if (starValue >= 1) {
        starArray.push("full");
      } else if (starValue >= 0.5 && allowHalf) {
        starArray.push("half");
      } else {
        starArray.push("empty");
      }
    }

    return starArray;
  }, [displayRating, outOf, allowHalf]);

  const handleMouseEnter = (starIndex: number, isHalf: boolean) => {
    if (!interactive || disabled) return;

    const newRating = isHalf ? starIndex + 0.5 : starIndex + 1;
    setHoverRating(newRating);
  };

  const handleMouseLeave = () => {
    if (!interactive || disabled) return;
    setHoverRating(null);
  };

  const handleClick = (starIndex: number, isHalf: boolean) => {
    if (!interactive || disabled || !onRatingChange) return;

    const newRating = isHalf ? starIndex + 0.5 : starIndex + 1;
    onRatingChange(Math.round(newRating / precision) * precision);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent,
    starIndex: number,
    isHalf: boolean
  ) => {
    if (!interactive || disabled || !onRatingChange) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick(starIndex, isHalf);
    }
  };

  const renderStar = (starType: StarType, index: number) => {
    const isInteractiveAndEnabled = interactive && !disabled;
    const baseClasses = `transition-colors duration-200 outline-none shadow-none ${
      isInteractiveAndEnabled ? "cursor-pointer" : ""
    } ${disabled ? "opacity-50" : ""}`;

    // Half star with custom implementation using clip-path
    if (starType === "half" && allowHalf) {
      return (
        <div
          key={index}
          className={`relative inline-block ${baseClasses}`}
          data-testid={`star-${index}`}
        >
          {/* Background empty star */}
          <Star size={size} className="fill-gray-300 text-gray-300" />

          {/* Half-filled star overlay */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          >
            <Star size={size} className="fill-yellow-400 text-yellow-400" />
          </div>

          {/* Interactive overlays for half stars */}
          {isInteractiveAndEnabled && (
            <>
              {/* Left half - for half star rating */}
              <button
                className="absolute inset-0 z-20 w-1/2 cursor-pointer rounded-sm border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
                onMouseEnter={() => handleMouseEnter(index, true)}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleClick(index, true);
                }}
                onKeyDown={(e) => handleKeyDown(e, index, true)}
                tabIndex={0}
                aria-label={`Rate ${index + 0.5} out of ${outOf} stars`}
                data-testid={`star-${index}-half`}
              />

              {/* Right half - for full star rating */}
              <button
                className="absolute inset-0 left-1/2 z-20 w-1/2 cursor-pointer rounded-sm border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
                onMouseEnter={() => handleMouseEnter(index, false)}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleClick(index, false);
                }}
                onKeyDown={(e) => handleKeyDown(e, index, false)}
                tabIndex={0}
                aria-label={`Rate ${index + 1} out of ${outOf} stars`}
                data-testid={`star-${index}-full`}
              />
            </>
          )}
        </div>
      );
    }

    // Regular star (full or empty) - interactive
    if (isInteractiveAndEnabled) {
      return (
        <button
          key={index}
          className={`${baseClasses} rounded-sm border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1`}
          onMouseEnter={() => handleMouseEnter(index, false)}
          onMouseLeave={handleMouseLeave}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleClick(index, false);
          }}
          onKeyDown={(e) => handleKeyDown(e, index, false)}
          tabIndex={0}
          aria-label={`Rate ${index + 1} out of ${outOf} stars`}
          data-testid={`star-${index}`}
        >
          <Star
            size={size}
            className={
              starType === "full"
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-300 text-gray-300"
            }
          />
        </button>
      );
    }

    // Non-interactive star
    return (
      <Star
        key={index}
        size={size}
        className={`${baseClasses} ${
          starType === "full"
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-300 text-gray-300"
        }`}
        data-testid={`star-${index}`}
      />
    );
  };

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="group"
      aria-label="Star rating"
    >
      <div className="flex gap-1">
        {stars.map((starType, index) => renderStar(starType, index))}
      </div>
      {showValue && (
        <span className="ml-2 text-sm text-gray-600" data-testid="rating-value">
          {displayRating.toFixed(1)} / {outOf}
        </span>
      )}
    </div>
  );
};

export default StarRating;
