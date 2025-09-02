import React from "react";
import SkeletonBox from "./SkeletonBox";

const SkeletonCarousel = () => {
    return (
        <div className="relative w-full container mx-auto px-4">
            {/* Left Button */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                <SkeletonBox className="w-10 h-10 rounded-full" />
            </div>

            {/* Skeleton cards */}
            <div className="flex w-full gap-4 overflow-hidden">
                {/* Always visible (mobile = 1 card → full width) */}
                <SkeletonBox className="h-64 flex-1 rounded-xl" />

                {/* Show 2 cards on md */}
                <SkeletonBox className="hidden md:block h-64 flex-1 rounded-xl" />

                {/* Show 3 cards on lg */}
                <SkeletonBox className="hidden lg:block h-64 flex-1 rounded-xl" />
            </div>

            {/* Right Button */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                <SkeletonBox className="w-10 h-10 rounded-full" />
            </div>
        </div>
    );
};

export default SkeletonCarousel;
