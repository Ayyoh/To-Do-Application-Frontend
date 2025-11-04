import React from "react";
import { Skeleton } from "./ui/skeleton";

function SkeletonLoader() {
  return (
    <div className="flex flex-col gap-4 space-x-4">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}

export default SkeletonLoader;
