const ChatHeaderSkeleton = () => {
    return (
        <div className='flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700'>
            <div className='flex items-center gap-4'>
                {/* Profile Picture Skeleton */}
                <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse border-2 border-gray-100 dark:border-gray-800" />
                    {/* Status Indicator Skeleton */}
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 bg-gray-300 dark:bg-slate-600 animate-pulse" />
                </div>

                {/* User Info Skeleton */}
                <div className='flex flex-col justify-center space-y-2'>
                    {/* Name Skeleton */}
                    <div className='w-32 h-5 bg-gray-200 dark:bg-slate-700 rounded animate-pulse' />
                    {/* Status Text Skeleton */}
                    <div className='flex items-center space-x-1'>
                        <div className='w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse' />
                        <div className='w-14 h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse' />
                    </div>
                </div>
            </div>

            {/* Close Button Skeleton */}
            <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse" />
        </div>
    );
};

export default ChatHeaderSkeleton;