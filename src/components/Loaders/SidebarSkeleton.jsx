const SidebarSkeleton = () => {
  return (
    <div className="p-4 space-y-4">
      {/* Search Bar Skeleton */}
      <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>

      {/* User List Skeletons */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-center space-x-3 p-3">
          {/* Avatar Skeleton */}
          <div className="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
          
          <div className="flex-1 space-y-2">
            {/* Name Skeleton */}
            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-24 animate-pulse"></div>
            {/* Message Preview Skeleton */}
            <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-32 animate-pulse"></div>
          </div>
          
          {/* Time Skeleton */}
          <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-10 animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};

export default SidebarSkeleton;