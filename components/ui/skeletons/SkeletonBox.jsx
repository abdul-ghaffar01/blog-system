import React from "react";

const SkeletonBox = ({ className }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-[var(--surface)] ${className}`}
    ></div>
  );
};

export default SkeletonBox;
