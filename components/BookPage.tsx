import React from 'react';
import { BookPageData, PageType } from '../types';
import { BookOpen, AlertCircle, HeartPulse, ShieldCheck, Info } from 'lucide-react';

interface BookPageProps {
  page: BookPageData;
  pageNumber: number;
  totalPages: number;
  isCover?: boolean;
}

export const BookPage: React.FC<BookPageProps> = ({ page, pageNumber, totalPages, isCover }) => {
  const getIcon = () => {
    switch(page.id) {
      case 1: return <AlertCircle className="w-8 h-8 text-amber-600" />;
      case 2: return <HeartPulse className="w-8 h-8 text-rose-600" />;
      case 3: return <BookOpen className="w-8 h-8 text-emerald-600" />;
      case 4: return <ShieldCheck className="w-8 h-8 text-blue-600" />;
      default: return <Info className="w-8 h-8 text-stone-600" />;
    }
  };

  const PageFooter = () => (
    <div className="w-full h-12 flex items-center justify-center text-xs text-stone-400 font-mono mt-auto border-t border-stone-100/50 bg-[#fdfbf7]">
      {pageNumber} / {totalPages}
    </div>
  );

  // Cover Page
  if (page.type === PageType.COVER) {
    return (
      <div className="w-full h-full bg-stone-800 text-stone-100 flex flex-col p-8 border-l-8 border-stone-900 shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
           <img src={page.imageUrl} alt="cover bg" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center relative z-10">
            <div className="text-center border-4 border-double border-stone-400 p-8 bg-stone-900/80 backdrop-blur-sm rounded-lg">
              <h1 className="text-4xl md:text-5xl font-bold serif mb-6 tracking-widest text-amber-500">{page.title}</h1>
              <div className="space-y-2 text-lg text-stone-300">
                {page.content?.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
            <div className="mt-12 text-stone-500 text-sm animate-pulse">
              點擊右側翻頁開始閱讀 &rarr;
            </div>
        </div>
      </div>
    );
  }

  // Back Cover
  if (page.type === PageType.BACK_COVER) {
    return (
      <div className="w-full h-full bg-stone-800 text-stone-100 flex flex-col justify-center items-center p-8 border-r-8 border-stone-900 shadow-inner relative overflow-hidden">
         <div className="absolute inset-0 opacity-20">
           <img src={page.imageUrl} alt="back cover bg" className="w-full h-full object-cover" />
        </div>
         <div className="relative z-10 text-center p-8 bg-stone-900/70 backdrop-blur-sm rounded-xl border border-stone-700">
          <h2 className="text-3xl font-bold serif mb-4 text-amber-500">{page.title}</h2>
           {page.content?.map((line, i) => (
              <p key={i} className="text-stone-300 text-xl mb-2">{line}</p>
            ))}
        </div>
      </div>
    );
  }

  // Content Pages (Text or Image)
  return (
    <div className="w-full h-full bg-[#fdfbf7] relative shadow-inner flex flex-col">
       {/* Paper Texture Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-50 z-0" style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-8 md:p-12 relative z-10">
        {/* Header */}
        <div className="mb-6 flex items-center border-b-2 border-stone-200 pb-4">
          {getIcon()}
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 ml-4 serif">{page.title}</h2>
        </div>

        {/* Content Body */}
        <div className="text-stone-700 leading-relaxed text-base md:text-lg space-y-4">
          {page.type === PageType.IMAGE && page.imageUrl && (
            <div className="flex flex-col items-center">
              {/* Removed rotate-1 to ensure image looks straight */}
              <div className="p-1 bg-white shadow-md rounded-sm border border-stone-200 mb-4 w-full max-h-[55vh] overflow-hidden flex justify-center items-center">
                <img src={page.imageUrl} alt={page.title} className="max-w-full max-h-full object-contain" />
              </div>
              {page.imageCaption && (
                <p className="text-sm text-stone-500 italic bg-stone-100 p-3 rounded-lg border-l-4 border-amber-400 w-full">
                  <strong>圖解說明：</strong> {page.imageCaption}
                </p>
              )}
            </div>
          )}

          {page.content?.map((paragraph, index) => {
            const isBullet = paragraph.trim().startsWith('•');
            return (
              <p 
                key={index} 
                className={`${isBullet ? 'pl-4 md:pl-8 -indent-4 md:-indent-8 font-medium text-stone-800' : 'indent-8 text-stone-600'}`}
              >
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>

      {/* Fixed Footer at the bottom */}
      <div className="relative z-20 w-full">
        <PageFooter />
      </div>
    </div>
  );
};