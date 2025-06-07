const MessageInputSkeleton = () => {
    return (
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
                {/* Document Selection Button Skeleton */}
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse flex-shrink-0" />

                {/* Message Input Bar Skeleton */}
                <div className="flex-1 h-10 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" />

                {/* Send Button Skeleton */}
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse flex-shrink-0" />
            </div>
        </div>
    );
};

export default MessageInputSkeleton;