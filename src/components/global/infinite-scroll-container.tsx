import { useCallback } from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteScrollContainerProps {
  children: React.ReactNode;
  onBottomReached: () => void;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export default function InfiniteScrollContainer({
  children,
  onBottomReached,
  className,
  threshold = 0.1,
  rootMargin = "100px",
}: InfiniteScrollContainerProps) {
  const handleIntersection = useCallback(
    (inView: boolean) => {
      if (inView) {
        onBottomReached();
      }
    },
    [onBottomReached]
  );

  const { ref } = useInView({
    threshold,
    rootMargin,
    onChange: handleIntersection,
  });

  return (
    <div className={className}>
      {children}
      {/* Invisible trigger element */}
      <div ref={ref} className="h-4" aria-hidden="true" />
    </div>
  );
}
