
import React, { useState, useMemo, useEffect } from 'react';
import { SURVEY_QUESTIONS } from './constants';
import { SurveyResponses } from './types';
import { Introduction } from './components/Introduction';
import { Declaration } from './components/Declaration';
import { QuestionCard } from './components/QuestionCard';
import { Completion } from './components/Completion';

// Connected to the user's Google Sheet script URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyw0Adn4TA_0a3lLVL8Iio6k-QSfF9mkkgrbZBTrrNUSQl-PhWiLInbDiMflCZZWA/exec"; 

const App: React.FC = () => {
  const [step, setStep] = useState<-1 | 0 | number>( -1); 
  const [responses, setResponses] = useState<SurveyResponses>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, isCompleted]);

  const currentQuestion = useMemo(() => {
    if (step < 1 || step > SURVEY_QUESTIONS.length) return null;
    return SURVEY_QUESTIONS[step - 1];
  }, [step]);

  const handleStart = () => {
    setDirection('next');
    setStep(0);
  };
  const handleDeclare = () => {
    setDirection('next');
    setStep(1);
  };

  const handleResponseChange = (value: string | string[]) => {
    if (!currentQuestion) return;
    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const submitToGoogleSheet = async (data: any) => {
    if (!GOOGLE_SCRIPT_URL) {
      console.warn("Google Script URL not set. Data saved locally only.");
      return;
    }
    
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Use no-cors for Google Apps Script redirects
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      // Note: With no-cors, we can't read the response body, 
      // but it allows the POST request to go through to Google Scripts.
      return true;
    } catch (error) {
      console.error("Submission failed:", error);
      return false;
    }
  };

  const nextStep = async () => {
    if (step < SURVEY_QUESTIONS.length) {
      setDirection('next');
      setStep(prev => (prev as number) + 1);
    } else {
      setIsSubmitting(true);
      
      const submissionData = {
        timestamp: new Date().toISOString(),
        ...responses
      };

      // 1. Save locally as backup
      const existing = localStorage.getItem('survey_results');
      const results = existing ? JSON.parse(existing) : [];
      results.push(submissionData);
      localStorage.setItem('survey_results', JSON.stringify(results));
      
      // 2. Sync to Google Sheets
      await submitToGoogleSheet(submissionData);
      
      setIsSubmitting(false);
      setIsCompleted(true);
    }
  };

  const prevStep = () => {
    setDirection('prev');
    if (step > 1) {
      setStep(prev => (prev as number) - 1);
    } else if (step === 1) {
      setStep(0);
    }
  };

  const progress = useMemo(() => {
    if (step <= 0) return 0;
    return Math.round((step / SURVEY_QUESTIONS.length) * 100);
  }, [step]);

  const canContinue = useMemo(() => {
    if (!currentQuestion) return false;
    if (currentQuestion.optional) return true;
    const res = responses[currentQuestion.id];
    if (currentQuestion.type === 'multiple') {
      return Array.isArray(res) && res.length > 0;
    }
    return res !== undefined && res !== '';
  }, [currentQuestion, responses]);

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#FFFBF7] flex items-center justify-center p-4">
        <Completion />
      </div>
    );
  }

  if (step === -1) {
    return (
      <div className="min-h-screen bg-[#FFFBF7] py-12 px-4">
        <Introduction onStart={handleStart} />
      </div>
    );
  }

  if (step === 0) {
    return (
      <div className="min-h-screen bg-[#FFFBF7] py-12 px-4">
        <Declaration onAgree={handleDeclare} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBF7] flex flex-col p-4">
      {isSubmitting && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mb-4"></div>
          <p className="font-black text-orange-800 uppercase tracking-widest animate-pulse">Syncing to Research Database...</p>
        </div>
      )}

      <div className="max-w-3xl w-full mx-auto flex-1 py-8">
        {/* Progress Header with Running Robot */}
        <div className="mb-14 relative">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Section {currentQuestion?.section.split(':')[0]} • Question {step} of {SURVEY_QUESTIONS.length}</span>
            <span className="text-sm font-black text-orange-600 px-3 py-1 bg-orange-100 rounded-full">{progress}% Complete</span>
          </div>
          
          <div className="relative h-4 w-full bg-slate-200/50 rounded-full p-1 border border-slate-100 overflow-visible">
            {/* The Running Robot */}
            <div 
              className="absolute -top-11 text-4xl robot-running transition-all" 
              style={{ 
                left: `${progress}%`,
                transform: `translateX(-50%)`
              }}
            >
              <div className="flex flex-col items-center">
                 <span className="text-sm font-black text-orange-600 bg-white px-2 py-0.5 rounded shadow-sm mb-1 border border-orange-100">🏁</span>
                 <span>🤖</span>
              </div>
            </div>
            
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-700 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Area */}
        {currentQuestion && (
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            response={responses[currentQuestion.id]}
            onChange={handleResponseChange}
            direction={direction}
          />
        )}

        {/* Sticky Footer Navigation */}
        <div className="sticky bottom-6 mt-10 flex justify-between items-center bg-white/80 backdrop-blur-md p-5 rounded-3xl shadow-2xl border border-white/20">
          <button
            onClick={prevStep}
            className="px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all text-slate-400 hover:text-orange-600 hover:bg-orange-50 active:scale-95"
          >
            Back
          </button>

          <div className="flex items-center gap-4">
            {!canContinue && currentQuestion && !currentQuestion.optional && (
              <span className="text-[10px] text-orange-400 font-black uppercase tracking-tighter hidden sm:block animate-pulse">Required</span>
            )}
            <button
              onClick={nextStep}
              disabled={!canContinue || isSubmitting}
              className={`px-12 py-4 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl transition-all flex items-center ${
                canContinue && !isSubmitting
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 transform hover:scale-105 active:scale-95 shadow-orange-200'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50'
              }`}
            >
              {step === SURVEY_QUESTIONS.length ? 'Finish Survey' : 'Continue'}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <footer className="mt-auto py-8 text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Academic AI Research Study • Global IHRDG • {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default App;
