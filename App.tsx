import React from 'react';
import { PDFBook } from './components/PDFBook';

function App() {
  return (
    <div className="min-h-screen bg-stone-200 flex flex-col p-4 md:p-8 relative">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519791883288-dc8bd696e667?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 blur-sm pointer-events-none" />
      
      {/* Header */}
      <header className="relative z-10 mb-2 md:mb-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 bg-white/80 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-600 rounded-md flex items-center justify-center text-white font-serif font-bold">胃</div>
          <h1 className="text-base md:text-xl font-bold text-stone-800 tracking-wide">腸胃英雄的健康之旅</h1>
        </div>
        <a 
          href="/腸胃英雄的健康之旅.pdf" 
          download 
          className="text-xs md:text-sm text-stone-500 hover:text-stone-800 transition-colors px-3 md:px-4 py-1.5 md:py-2 bg-amber-100 hover:bg-amber-200 rounded-lg whitespace-nowrap"
        >
          下載 PDF
        </a>
      </header>

      {/* Main PDF Area */}
      <main className="flex-1 relative z-10 flex items-center justify-center">
        <PDFBook pdfUrl="/腸胃英雄的健康之旅.pdf" />
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-4 text-xs text-stone-500 text-center">
      </footer>
    </div>
  );
}

export default App;
