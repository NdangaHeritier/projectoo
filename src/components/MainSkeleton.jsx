// MainSkeleton: A loading skeleton for main content, used as a placeholder while data is loading
export default function MainSkeleton() {
  // Return a full-screen flex container, centered both vertically and horizontally, with background color
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
        {/* Navbar skeleton */}
        <div className="w-full p-4 px-10 bg-white dark:bg-black flex items-center justify-between">
           {/* Skeleton for navbar title */}
            <div className="bg-gray-200 dark:bg-gray-900 w-12 h-12 rounded-full"></div>
            <div className="animate-pulse space-x-2 inline-flex items-center justify-center">            
                {/* Skeleton for navbar links */}
                <div className="h-4 bg-gray-200 dark:bg-gray-900 rounded-md w-14"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-900 rounded-md w-20"></div>
                <div className="rounded-full bg-gray-200 dark:bg-gray-900 w-10 h-10 "></div>
            </div>
        </div>
      {/* Main skeleton card container with max width, padding, rounded corners, and shadow */}
      <div className="w-full p-6 bg-gray-100 dark:bg-gray-950 flex items-start max-sm:flex-col-reverse gap-5">
       
        {/* Left sidebar skeleton */}
        <div className="w-full sm:w-1/8 space-y-4">
          {/* Skeleton for sidebar profile picture */}
            <div className="w-15 h-15 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            {/* Skeleton for sidebar links */}
            <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/5"></div>
            </div>
        </div>
        {/* Main content skeleton */}
        <div className="w-full sm:w-7/8 space-y-6">
          {/* Skeleton for main content header */}
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          {/* Skeleton for main content body */}
          <div className="space-y-4">
            <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
            <div className="grid grid-cols-2 grid-row-1 py-5 gap-5">
                <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            </div>
            <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
            </div>
          {/* Skeleton for main content footer */}
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>
      {/* Footer skeleton */}
      <div className="w-full p-4 bg-white dark:bg-black text-center">
        <div className="h-4 bg-gray-200 dark:bg-gray-900 rounded w-1/4 mx-auto"></div>
      </div>       
    </div>
  );
}