import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('🚀 [index.tsx] 開始執行');
console.log('🔍 [index.tsx] React 版本:', React.version);
console.log('🔍 [index.tsx] ReactDOM:', ReactDOM);

const rootElement = document.getElementById('root');
console.log('📍 [index.tsx] rootElement:', rootElement);

if (!rootElement) {
  console.error('❌ [index.tsx] 找不到 root 元素！');
  throw new Error("Could not find root element to mount to");
}

console.log('✅ [index.tsx] 找到 root 元素，開始渲染');

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('✅ [index.tsx] App 渲染完成');
} catch (error) {
  console.error('❌ [index.tsx] 渲染錯誤:', error);
  document.body.innerHTML = `<div style="padding: 20px; color: red;">渲染錯誤：${error}</div>`;
}