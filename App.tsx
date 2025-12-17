import React from 'react';
import { Book } from './components/Book';
import { BOOK_CONTENT } from './constants';

function App() {
  console.log('📱 [App.tsx] App 組件開始渲染');
  console.log('📚 [App.tsx] BOOK_CONTENT:', BOOK_CONTENT);
  console.log('📚 [App.tsx] BOOK_CONTENT 長度:', BOOK_CONTENT?.length);
  
  try {
    return (
    <div className="min-h-screen bg-stone-200 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519791883288-dc8bd696e667?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 blur-sm pointer-events-none" />
      
      {/* Header */}
      <header className="absolute top-0 left-0 p-6 z-10 w-full flex justify-between items-center bg-gradient-to-b from-stone-200/90 to-transparent">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-600 rounded-md flex items-center justify-center text-white font-serif font-bold">胃</div>
          <h1 className="text-xl font-bold text-stone-800 tracking-wide">胃炎衛教手冊</h1>
        </div>
        <a href="#" className="text-sm text-stone-500 hover:text-stone-800 transition-colors">下載 PDF</a>
      </header>

      {/* Main Book Area */}
      <main className="w-full h-full flex items-center justify-center z-10 py-10">
        {BOOK_CONTENT && BOOK_CONTENT.length > 0 ? (
          <Book pages={BOOK_CONTENT} />
        ) : (
          <div className="text-red-600 p-4 bg-white rounded">
            錯誤：找不到書籍內容資料
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 text-xs text-stone-500 text-center w-full z-10">
        <p>© 2024 醫療健康資訊網 - 內容僅供參考，如有不適請立即就醫。</p>
      </footer>
    </div>
  );
  } catch (error) {
    console.error('❌ [App.tsx] 渲染錯誤:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">渲染錯誤</h2>
          <p>{String(error)}</p>
        </div>
      </div>
    );
  }
}

export default App;
