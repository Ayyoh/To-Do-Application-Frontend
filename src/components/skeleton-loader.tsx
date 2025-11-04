import React from "react";
import { Skeleton } from "./ui/skeleton";

function SkeletonLoader() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-40 w-full rounded-lg p-4" />
        <Skeleton className="h-40 w-full rounded-lg p-4" />
        <Skeleton className="h-40 w-full rounded-lg p-4" />
      </div>

      <div className="flex flex-col gap-4">
        <Skeleton className="h-40 w-full rounded-lg p-4" />
        <Skeleton className="h-40 w-full rounded-lg p-4" />
        <Skeleton className="h-40 w-full rounded-lg p-4" />
      </div>
    </div>
  );
}

export default SkeletonLoader;
