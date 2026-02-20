const PlaceDetailSideBarSkeleton = () => {
  return (
    <div className="fixed top-0 left-0 w-[390px] h-screen bg-white shadow-lg z-[1000] flex flex-col overflow-hidden">
      {/* Image Skeleton */}
      <div className="relative w-full h-[200px] flex-shrink-0 bg-gray-200 animate-pulse" />

      <div className="p-5">
        {/* Title Skeleton */}
        <div className="h-7 w-3/4 bg-gray-200 rounded animate-pulse mb-4" />

        {/* Info Skeleton */}
        <div className="space-y-3">
          <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-5/6 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse" />
        </div>

        <hr className="my-5 border-gray-200" />

        {/* Menu Skeleton */}
        <div>
          <div className="h-6 w-1/4 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="space-y-2">
            <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        <hr className="my-5 border-gray-200" />

        {/* Reviews Skeleton */}
        <div>
          <div className="h-6 w-1/4 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="space-y-4">
            <div className="h-16 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-16 w-full bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailSideBarSkeleton;
