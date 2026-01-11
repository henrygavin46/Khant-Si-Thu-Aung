
import React, { useState } from 'react';

interface DeclarationProps {
  onAgree: () => void;
}

export const Declaration: React.FC<DeclarationProps> = ({ onAgree }) => {
  const [checked, setChecked] = useState(false);

  const points = [
    "I undertake to abide by the University's ethical and health and safety guidelines.",
    "If the research is approved, I am dedicated to adhering to the study protocol, the terms of this application, and any conditions set out by the Ethical Review Board (ERB), ensuring full compliance with all regulatory requirements.",
    "Before implementing substantial amendments to the protocol, I will diligently seek an ethical opinion from the ERB, underscoring my commitment to the integrity of the research process.",
    "I undertake to submit progress reports to ERB if required.",
    "I am fully aware of my responsibility to be up to date and comply with the requirements of the law and relevant guidelines relating to the security and confidentiality of patient or other personal data, and if necessary, to report to the ERB.",
    "I understand that research records/ data may be subject to inspection for audit purposes if required in future.",
    "I understand that the ERB will hold personal data about me as a researcher in this application and that this will be managed according to the University's policy.",
    "I am fully aware and prepared for the possibility that the ERB may choose to audit this project at any point after approval, demonstrating my readiness and commitment to transparency.",
    "The information in this form is not only accurate to the best of my knowledge and belief, but I also take full responsibility for its reliability and trustworthiness."
  ];

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white">
        <h1 className="text-2xl font-bold uppercase tracking-tight">Declaration Form</h1>
        <p className="text-orange-100 mt-2">Ethical commitment and research integrity guidelines.</p>
      </div>

      <div className="p-8">
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4 mb-8 custom-scrollbar">
          <p className="font-semibold text-slate-800 italic">I thoroughly review and commit to the following disciplines:</p>
          <ol className="space-y-4">
            {points.map((point, index) => (
              <li key={index} className="flex gap-4 text-slate-600 text-sm leading-relaxed">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full font-bold text-xs">
                  {index + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ol>
          <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-lg">
            <p className="text-xs text-orange-800">
              <strong>Note:</strong> There is an obligation on the lead researcher / supervisor to bring to the attention of the ERB any issues with ethical implications not clearly covered above.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8">
          <label className="flex items-start gap-4 p-4 border rounded-xl cursor-pointer hover:bg-orange-50 transition-all border-slate-200 has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="mt-1 w-5 h-5 text-orange-600 border-slate-300 rounded focus:ring-orange-500"
            />
            <span className="text-slate-700 font-semibold leading-tight">
              I have read, fully understand, and agree with the form above.
            </span>
          </label>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onAgree}
              disabled={!checked}
              className={`px-10 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform ${
                checked
                  ? 'bg-orange-600 text-white hover:bg-orange-700 hover:scale-105'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Accept & Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
