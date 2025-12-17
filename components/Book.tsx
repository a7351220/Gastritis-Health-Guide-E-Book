import React, { useState, useEffect } from 'react';
import { BookPageData } from '../types';
import { BookPage } from './BookPage';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookProps {
  pages: BookPageData[];
}

export const Book: React.FC<BookProps> = ({ pages }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = pages.length;

  // Ensure even number of pages for the 3D book feel if using spread, 
  // but for this single-sheet turning effect, odd is fine.
  
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Preload images
  useEffect(() => {
    pages.forEach(page => {
      if (page.imageUrl) {
        const img = new Image();
        img.src = page.imageUrl;
      }
    });
  }, [pages]);

  return (
    <div className="relative w-full max-w-4xl h-[85vh] md:h-[800px] flex items-center justify-center">
      
      {/* Mobile Controls (Top) */}
      <div className="absolute -top-12 flex space-x-4 md:hidden">
        <button 
          onClick={handlePrev} 
          disabled={currentPage === 0}
          className="p-2 bg-stone-800 text-white rounded-full disabled:opacity-30"
        >
          <ChevronLeft />
        </button>
        <span className="py-2 text-stone-600 font-bold">{currentPage + 1} / {totalPages}</span>
        <button 
          onClick={handleNext} 
          disabled={currentPage === totalPages - 1}
          className="p-2 bg-stone-800 text-white rounded-full disabled:opacity-30"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Book Container */}
      <div className="relative w-full h-full perspective-1500 group">
        
        {/* Pages Stack */}
        <div className="relative w-full h-full flex justify-center items-center">
           {/* Desktop: We simulate a book spine and depth here */}
           <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 bg-stone-900 -translate-x-1/2 z-0 rounded-l-sm shadow-2xl"></div>

           {/* 
              RENDER STRATEGY:
              To achieve a realistic flip without complex libraries, we render ALL pages.
              Pages < currentPage are flipped to the left (-180deg).
              Page == currentPage is flat (0deg).
              Pages > currentPage are flat (0deg) but hidden behind.
              
              We use a "Right Page" anchor.
           */}
           
           <div className="relative w-full md:w-[600px] h-full preserve-3d transition-transform duration-700 ease-in-out">
              {pages.map((page, index) => {
                 // Logic to determine Z-index and Rotation
                 let zIndex = 0;
                 let rotation = 0;
                 let opacity = 1;
                 
                 if (index === currentPage) {
                   zIndex = 50;
                   rotation = 0;
                 } else if (index < currentPage) {
                   // Previous pages flipped to left
                   zIndex = index; // Stacks correctly
                   rotation = -180;
                   opacity = 0; // Hide them after flip to prevent bleed-through glitches
                 } else {
                   // Next pages waiting on right
                   zIndex = totalPages - index; // Stacks correctly (page 2 on top of 3)
                   rotation = 0; 
                 }

                 // Special handling for the immediate previous page to animate nicely
                 if (index === currentPage - 1) {
                    opacity = 1; // Keep visible during transition
                 }

                 return (
                   <div
                    key={page.id}
                    className="absolute inset-0 w-full h-full bg-white rounded-l-md rounded-r-xl shadow-2xl transition-all duration-700 ease-in-out origin-left backface-hidden border border-stone-200"
                    style={{
                      zIndex: zIndex,
                      transform: `rotateY(${rotation}deg)`,
                      opacity: opacity,
                      // For single page view, origin-left works best to simulate turning the page "away"
                    }}
                   >
                     <BookPage 
                        page={page} 
                        pageNumber={index + 1} 
                        totalPages={totalPages} 
                        isCover={index === 0} 
                      />
                      
                      {/* Click zone for next (Right side of page) */}
                      {index === currentPage && index < totalPages - 1 && (
                        <div 
                          className="absolute inset-y-0 right-0 w-1/4 cursor-pointer z-50 hover:bg-black/5 transition-colors"
                          onClick={handleNext}
                          title="下一頁"
                        />
                      )}
                      {/* Click zone for prev (Left side of page - visible only if we want to allow clicking back on the current page, usually we want this on the 'flipped' page which is handled by the state logic, but here we are single view) */}
                       {index === currentPage && index > 0 && (
                        <div 
                          className="absolute inset-y-0 left-0 w-1/6 cursor-pointer z-50 hover:bg-black/5 transition-colors"
                          onClick={handlePrev}
                          title="上一頁"
                        />
                      )}
                   </div>
                 );
              })}
           </div>
        </div>
      </div>

      {/* Desktop Controls (Side Arrows) */}
      <button 
        onClick={handlePrev}
        disabled={currentPage === 0}
        className="hidden md:flex absolute left-4 lg:-left-16 top-1/2 -translate-y-1/2 p-4 bg-white/80 hover:bg-white text-stone-800 rounded-full shadow-lg transition-all disabled:opacity-0 disabled:pointer-events-none z-50"
      >
        <ChevronLeft size={32} />
      </button>

      <button 
        onClick={handleNext}
        disabled={currentPage === totalPages - 1}
        className="hidden md:flex absolute right-4 lg:-right-16 top-1/2 -translate-y-1/2 p-4 bg-white/80 hover:bg-white text-stone-800 rounded-full shadow-lg transition-all disabled:opacity-0 disabled:pointer-events-none z-50"
      >
        <ChevronRight size={32} />
      </button>

    </div>
  );
};
