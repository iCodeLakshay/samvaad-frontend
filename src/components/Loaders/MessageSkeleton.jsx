const MessageSkeleton = () => {
    return (
        <div className="flex flex-col space-y-6 p-4 dark:bg-gray-900">
            {[...Array(6)].map((_, i) => (
                <div 
                    key={i} 
                    className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}
                >
                    <div className={`flex ${i % 2 === 0 ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                        {/* Profile Picture - Only show for messages on the left */}
                        {i % 2 !== 0 && (
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse flex-shrink-0" />
                        )}
                        
                        {/* Message Content */}
                        <div className={`flex flex-col ${i % 2 === 0 ? 'items-end mr-2' : 'items-start ml-2'} space-y-1`}>
                            {/* Message Bubble with varying widths for natural look */}
                            <div 
                                className={`${i % 2 === 0 
                                    ? 'rounded-[20px] rounded-tr-sm bg-gray-200 dark:bg-slate-700' 
                                    : 'rounded-[20px] rounded-tl-sm bg-gray-200 dark:bg-slate-700'} 
                                    animate-pulse h-12 ${
                                        i % 3 === 0 ? 'w-80' : i % 3 === 1 ? 'w-64' : 'w-48'
                                    }`}
                            />
                            {/* Time Stamp */}
                            <div className="w-16 h-2 bg-gray-200 dark:bg-slate-700 rounded animate-pulse opacity-70" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageSkeleton;