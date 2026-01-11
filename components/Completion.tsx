
import React, { useState } from 'react';
import { Logo } from './Logo';

export const Completion: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount >= 5) {
      downloadData();
      setClickCount(0);
    }
  };

  const downloadData = () => {
    const saved = localStorage.getItem('survey_results');
    if (!saved) {
      alert("No data collected yet.");
      return;
    }

    // Explicitly cast JSON.parse result to any[] to avoid 'unknown' type issues in modern TS
    const data = JSON.parse(saved) as any[];
    if (data.length === 0) return;

    // Get all unique keys from all entries and cast to string[] to ensure 'header' variable is not 'unknown'
    const headers = Array.from(new Set(data.flatMap((entry: any) => Object.keys(entry)))) as string[];
    const csvRows: string[] = [];
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map((header: string) => {
        // Access row by index, defaulting to empty string if not found
        const val = (row as Record<string, any>)[header] || '';
        const escaped = String(val).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `survey_results_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-12 rounded-3xl shadow-2xl text-center border border-orange-50 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-red-500"></div>

      <div className="mb-8 flex justify-center cursor-pointer select-none" onClick={handleLogoClick}>
        <Logo />
      </div>

      <div className="mb-6 inline-flex items-center justify-center w-24 h-24 bg-orange-100 text-orange-600 rounded-full animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Thank you for participating!</h1>
      <p className="text-slate-600 text-lg mb-10 leading-relaxed">
        Your honest responses will help create more equitable policies for emerging scholars. Your contribution is invaluable to our research.
      </p>

      <div className="bg-gradient-to-br from-slate-50 to-orange-50/30 p-8 rounded-3xl border border-orange-100 text-left mb-10 shadow-inner">
        <h3 className="font-bold text-orange-800 mb-3 flex items-center gap-2 uppercase tracking-widest text-sm">
          <span className="text-xl">📧</span> Help & Support
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          If you experienced or know someone who experienced being falsely accused of AI use and would like information on how to address this, please contact:
        </p>
        <div className="inline-block px-4 py-2 bg-white rounded-lg border border-orange-200 shadow-sm">
          <p className="font-mono text-orange-700 font-black">gavin.cp.ihrdg@gmail.com</p>
        </div>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="text-orange-600 hover:text-orange-700 font-bold underline decoration-2 underline-offset-4"
      >
        Submit another response
      </button>
      
      {clickCount > 0 && clickCount < 5 && (
        <p className="mt-4 text-[10px] text-slate-300 uppercase tracking-tighter">Owner Verification: {clickCount}/5</p>
      )}
    </div>
  );
};
