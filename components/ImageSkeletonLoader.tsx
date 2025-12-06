import React from 'react';
import { DinoHeadIcon } from './Icons';

const ImageSkeletonLoader: React.FC = () => {
    return (
        <div className="w-full h-full bg-slate-200 rounded-xl flex items-center justify-center animate-pulse">
            <DinoHeadIcon className="w-16 h-16 md:w-24 md:h-24 text-slate-300" />
        </div>
    );
};

export default ImageSkeletonLoader;
