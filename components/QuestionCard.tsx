
import React, { useState, useEffect } from 'react';
import { Question, SurveyResponses } from '../types';
import { LIKERT_SCALE } from '../constants';

interface QuestionCardProps {
  question: Question;
  response: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
  direction: 'next' | 'prev';
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, response, onChange, direction }) => {
  const [otherValue, setOtherValue] = useState('');

  useEffect(() => {
    if (typeof response === 'string' && question.hasOther && !question.options?.includes(response)) {
      setOtherValue(response);
    } else if (Array.isArray(response) && question.hasOther) {
      const other = response.find(r => !question.options?.includes(r));
      if (other) setOtherValue(other);
    }
  }, [question, response]);

  const handleMultipleChange = (val: string) => {
    const current = Array.isArray(response) ? response : [];
    if (current.includes(val)) {
      onChange(current.filter(i => i !== val));
    } else {
      onChange([...current, val]);
    }
  };

  const renderInputs = () => {
    const inputClasses = "w-full bg-white !bg-white border-2 border-slate-200 focus:border-orange-500 outline-none py-3 px-4 rounded-xl transition-all font-medium text-slate-900 !text-slate-900 placeholder:text-slate-400 shadow-sm";

    switch (question.type) {
      case 'single':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label key={option} className="flex items-center p-4 border-2 rounded-xl hover:bg-orange-50 cursor-pointer transition-all border-slate-100 has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50/50 has-[:checked]:ring-2 has-[:checked]:ring-orange-200 bg-white">
                <input
                  type="radio"
                  name={question.id}
                  checked={response === option}
                  onChange={() => onChange(option)}
                  className="w-5 h-5 text-orange-600 focus:ring-orange-500 border-slate-300"
                />
                <span className="ml-4 text-slate-700 font-semibold">{option}</span>
              </label>
            ))}
            {question.hasOther && (
              <div className="mt-2">
                <label className="flex items-center p-4 border-2 rounded-xl hover:bg-orange-50 cursor-pointer transition-all border-slate-100 has-[:focus-within]:border-orange-500 has-[:focus-within]:bg-orange-50/50 bg-white">
                   <input
                    type="radio"
                    name={question.id}
                    checked={response !== '' && !question.options?.includes(response as string) && response !== undefined}
                    onChange={() => onChange(otherValue)}
                    className="w-5 h-5 text-orange-600 focus:ring-orange-500 border-slate-300"
                  />
                  <div className="flex-1 ml-4">
                    <input
                      type="text"
                      placeholder="Other (specify):"
                      value={otherValue}
                      onChange={(e) => {
                        setOtherValue(e.target.value);
                        onChange(e.target.value);
                      }}
                      className={inputClasses}
                    />
                  </div>
                </label>
              </div>
            )}
          </div>
        );

      case 'multiple':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label key={option} className="flex items-center p-4 border-2 rounded-xl hover:bg-orange-50 cursor-pointer transition-all border-slate-100 has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50/50 has-[:checked]:ring-2 has-[:checked]:ring-orange-200 bg-white">
                <input
                  type="checkbox"
                  checked={Array.isArray(response) && response.includes(option)}
                  onChange={() => handleMultipleChange(option)}
                  className="w-5 h-5 text-orange-600 focus:ring-orange-500 border-slate-300 rounded"
                />
                <span className="ml-4 text-slate-700 font-semibold">{option}</span>
              </label>
            ))}
            {question.hasOther && (
              <div className="mt-2">
                 <label className="flex items-center p-4 border-2 rounded-xl hover:bg-orange-50 cursor-pointer transition-all border-slate-100 has-[:focus-within]:border-orange-500 has-[:focus-within]:bg-orange-50/50 bg-white">
                  <span className="ml-8 flex-1">
                    <input
                      type="text"
                      placeholder="Other (specify):"
                      value={otherValue}
                      onChange={(e) => {
                        const newVal = e.target.value;
                        setOtherValue(newVal);
                        const current = Array.isArray(response) ? response : [];
                        const baseOptions = question.options || [];
                        const cleanList = current.filter(i => baseOptions.includes(i));
                        if (newVal.trim()) {
                          onChange([...cleanList, newVal]);
                        } else {
                          onChange(cleanList);
                        }
                      }}
                      className={inputClasses}
                    />
                  </span>
                </label>
              </div>
            )}
          </div>
        );

      case 'text':
        return (
          <textarea
            className="w-full p-6 border-2 border-slate-100 rounded-3xl focus:ring-4 focus:ring-orange-100 focus:border-orange-400 outline-none transition-all h-48 font-medium text-slate-900 !text-slate-900 bg-white !bg-white placeholder:text-slate-400 shadow-inner"
            placeholder={question.placeholder || 'Type your detailed answer here...'}
            value={typeof response === 'string' ? response : ''}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case 'scale':
        const scaleColors = [
          'from-red-100 to-red-200 text-red-800 border-red-200',
          'from-orange-100 to-orange-200 text-orange-800 border-orange-200',
          'from-slate-100 to-slate-200 text-slate-800 border-slate-200',
          'from-blue-100 to-blue-200 text-blue-800 border-blue-200',
          'from-green-100 to-green-200 text-green-800 border-green-200',
          'from-slate-100 to-slate-100 text-slate-500 border-slate-100'
        ];
        
        const scaleActiveColors = [
          'bg-red-500 text-white border-red-600 ring-red-100',
          'bg-orange-500 text-white border-orange-600 ring-orange-100',
          'bg-slate-500 text-white border-slate-600 ring-slate-100',
          'bg-blue-500 text-white border-blue-600 ring-blue-100',
          'bg-green-500 text-white border-green-600 ring-green-100',
          'bg-slate-300 text-slate-700 border-slate-400 ring-slate-50'
        ];

        return (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between px-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span>Strongly Disagree</span>
              <span>Strongly Agree</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {LIKERT_SCALE.map((level, idx) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => onChange(level)}
                  className={`p-4 text-sm text-center border-2 rounded-2xl transition-all font-black uppercase tracking-tight shadow-sm hover:scale-[1.02] active:scale-95 ${
                    response === level
                      ? `${scaleActiveColors[idx]} ring-4 shadow-lg scale-105 z-10`
                      : `bg-gradient-to-br ${scaleColors[idx]} opacity-70 hover:opacity-100`
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const animationClass = direction === 'next' ? 'animate-slide-in-right' : 'animate-slide-in-left';

  return (
    <div key={question.id} className={`bg-white p-10 rounded-3xl shadow-xl border border-slate-50 min-h-[450px] relative overflow-hidden ${animationClass}`}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-12 -mt-12 opacity-50"></div>
      <div className="mb-4 inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs font-black uppercase tracking-widest">
        {question.section}
      </div>
      <h2 className="text-2xl font-black text-slate-800 mb-10 leading-snug">
        {question.text} {question.optional && <span className="text-slate-400 font-medium text-sm ml-2 tracking-normal uppercase">(Optional)</span>}
      </h2>
      <div className="mt-4">
        {renderInputs()}
      </div>
    </div>
  );
};
