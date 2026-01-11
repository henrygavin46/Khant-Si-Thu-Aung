
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-12" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        {/* Sun Icon */}
        <div className="grid grid-cols-3 gap-0.5 transform rotate-12">
           {[...Array(8)].map((_, i) => (
             <div key={i} className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500" style={{ transform: `rotate(${i * 45}deg) translate(8px)` }}></div>
           ))}
        </div>
      </div>
      <div className="flex items-baseline">
        <span className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-500" style={{ fontFamily: 'sans-serif' }}>
          SUM
        </span>
      </div>
    </div>
  );
};
