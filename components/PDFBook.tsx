import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

// 設置 worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFBookProps {
  pdfUrl: string;
}

export const PDFBook: React.FC<PDFBookProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageWidth, setPageWidth] = useState<number>(0);

  useEffect(() => {
    // 根據螢幕寬度設定 PDF 頁面寬度
    const updateWidth = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // 手機
        setPageWidth(width - 32);
      } else if (width < 1024) {
        // 平板
        setPageWidth(width - 64);
      } else {
        // 桌機
        setPageWidth(Math.min(width * 0.7, 900));
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(numPages, prev + 1));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {/* 控制按鈕 - 桌面版 */}
      <div className="hidden md:flex mb-4 items-center gap-4 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
        <button
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          className="p-2 bg-stone-800 text-white rounded-full disabled:opacity-30 hover:bg-stone-700 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        
        <span className="text-stone-800 font-bold min-w-[100px] text-center">
          {pageNumber} / {numPages}
        </span>
        
        <button
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
          className="p-2 bg-stone-800 text-white rounded-full disabled:opacity-30 hover:bg-stone-700 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* 控制按鈕 - 手機版 (固定在底部) */}
      <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-2xl">
        <button
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          className="p-2 bg-stone-800 text-white rounded-full disabled:opacity-30 active:scale-95 transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        
        <span className="text-stone-800 font-bold text-sm min-w-[70px] text-center">
          {pageNumber} / {numPages}
        </span>
        
        <button
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
          className="p-2 bg-stone-800 text-white rounded-full disabled:opacity-30 active:scale-95 transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* PDF 顯示區域 */}
      <div className="flex-1 overflow-auto w-full flex justify-center px-2 md:px-4 pb-20 md:pb-4">
        <div className="bg-white rounded-lg shadow-2xl">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center min-h-[400px] md:min-h-[600px] px-4">
                <div className="text-stone-600 text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-stone-300 border-t-stone-600 rounded-full mx-auto mb-2"></div>
                  <p>載入中...</p>
                </div>
              </div>
            }
            error={
              <div className="flex items-center justify-center min-h-[400px] md:min-h-[600px] px-4">
                <div className="text-red-600 bg-white p-6 rounded-lg shadow text-center">
                  <p className="font-bold mb-2">載入 PDF 失敗</p>
                  <p className="text-sm text-stone-600">請確認檔案路徑是否正確</p>
                </div>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              width={pageWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="rounded-lg overflow-hidden"
            />
          </Document>
        </div>
      </div>
    </div>
  );
};
