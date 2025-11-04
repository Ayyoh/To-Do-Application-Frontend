import React from "react";
import { Skeleton } from "./ui/skeleton";

function SkeletonLoader() {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Left Column */}
      <div className="flex flex-col gap-4 flex-1">
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="h-40 w-full rounded-lg" />
      </div>

      {/* Right Column (hidden on small screens, visible on md+) */}
      <div className="hidden md:flex flex-col gap-4 flex-1">
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="h-40 w-full rounded-lg" />
      </div>
      
      <div className="hidden md:flex flex-col gap-4 flex-1">
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="h-40 w-full rounded-lg" />
      </div>
    </div>
  );
}

export default SkeletonLoader;
