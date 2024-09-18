import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const LyricCard = ({ lyric }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    // Log the lyric object to check its structure
    console.log(lyric);

    // Fallback values
    const title = lyric.title || 'Untitled';
    const body = lyric.lyrics || 'No lyrics available.';

    return (
        <div 
            className={`border rounded-md p-4 pb-20 bg-gray-800 transition-all duration-300 ${isExpanded ? 'h-auto' : 'h-20 overflow-hidden'} `}
            onClick={toggleExpand}
        >
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-100">{title}</h3>
                <FaChevronDown className={`text-gray-100 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </div>
            {isExpanded ? (
                <div className="mt-2 ">
                    <p className='text-white'>{body}</p> {/* Full lyrics */}
                </div>
            ) : (
                <p className="mt-2 text-gray-100">
                    {body.slice(0, 15)}{body.length > 15 ? '...' : ''}
                </p>
            )}
        </div>
    );
};

export default LyricCard;