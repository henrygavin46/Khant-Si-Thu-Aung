
import React from 'react';
import { Logo } from './Logo';

interface IntroductionProps {
  onStart: () => void;
}

export const Introduction: React.FC<IntroductionProps> = ({ onStart }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
      <div className="bg-gradient-to-r from-orange-400 to-red-500 p-10 text-white relative">
        <Logo className="mb-6 filter brightness-0 invert opacity-90" />
        <h1 className="text-3xl font-bold mb-4">Survey on AI in Academic Writing</h1>
        <p className="text-orange-50 leading-relaxed text-lg">
          We are conducting research on how emerging scholars in Myanmar and Thailand use AI tools (like ChatGPT, Gemini, Claude) in academic writing.
        </p>
      </div>

      <div className="p-10 space-y-8">
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3 uppercase tracking-wide">Objective</h2>
          <p className="text-slate-600 leading-relaxed">
            This study aims to understand your real experiences to help develop fairer AI policies that support students and researchers.
          </p>
        </section>

        <section className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
          <h2 className="text-lg font-bold text-orange-800 mb-4 flex items-center">
            <span className="mr-2 text-2xl">🛡️</span> Privacy Protections
          </h2>
          <ul className="space-y-4 text-slate-700">
            {[
              "This survey is completely anonymous—no names, emails, IP addresses, or institutional identifiers are collected.",
              "Your responses are for research purposes only and will NEVER be shared with your institution for disciplinary action.",
              "Your honest answers help improve policies for all students.",
              "You may skip any question that makes you uncomfortable."
            ].map((text, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-orange-500 font-bold">•</span>
                <span className="text-sm font-medium leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <h3 className="font-bold text-slate-700 mb-1 uppercase text-xs tracking-widest text-orange-500">Who can participate?</h3>
            <p className="text-sm text-slate-600">Undergraduate students (Year 1-4) writing academic work in English.</p>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <h3 className="font-bold text-slate-700 mb-1 uppercase text-xs tracking-widest text-orange-500">Estimated Time</h3>
            <p className="text-sm text-slate-600">Approximately 15-20 minutes</p>
          </div>
        </div>

        <div className="text-center pt-6 border-t border-slate-100">
          <p className="text-sm text-slate-400 mb-8 italic">Questions? Contact: gavin.cp.ihrdg@gmail.com</p>
          <button
            onClick={onStart}
            className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-black text-xl rounded-full transition-all transform hover:scale-105 shadow-2xl hover:shadow-orange-200"
          >
            Start Survey
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
