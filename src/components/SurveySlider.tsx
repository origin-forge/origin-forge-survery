"use client";
import React, { useState } from "react";
import { surveyQuestions } from "../data/surveyQuestions";
import { saveSurveyResponse } from "../lib/supabase";

const pixelPanel =
  "border-4 border-yellow-700 bg-yellow-100 shadow-lg rounded-lg p-4 sm:p-6 pixel-border w-full max-w-lg";
const pixelButton =
  "hero-btn w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#281A25] font-bold shadow-lg pixel-border hover:from-yellow-500 hover:to-yellow-700 transition px-4 sm:px-6 py-2 mt-4 text-base sm:text-lg";

type Answers = Record<number, string | string[]>;

export default function SurveySlider({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showEnd, setShowEnd] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleOption = async (qid: number, value: string) => {
    const updated = { ...answers, [qid]: value };
    setAnswers(updated);
    if (step === surveyQuestions.length - 1) {
      setShowLoader(true);
      // Calculate total score from selected options
      let totalScore = 0;
      for (const q of surveyQuestions) {
        const ans = updated[q.id];
        if (q.options && ans) {
          if (Array.isArray(ans)) {
            for (const v of ans) {
              const opt = q.options.find(o => o.value === v);
              if (opt && opt.points) totalScore += opt.points;
            }
          } else {
            const opt = q.options.find(o => o.value === ans);
            if (opt && opt.points) totalScore += opt.points;
          }
        }
      }
      await saveSurveyResponse(updated, totalScore);
      setShowLoader(false);
      setTimeout(() => setShowEnd(true), 350);
    } else {
      setTimeout(() => setStep((s) => s + 1), 350);
    }
  };

  if (showLoader) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-0">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-xs sm:max-w-md mx-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-8 border-yellow-400 border-t-transparent rounded-full animate-spin mb-6" />
          <div className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2 pixel-font text-center">Submitting your responses...</div>
          <div className="text-yellow-200 text-base sm:text-lg text-center">Please wait</div>
        </div>
      </div>
    );
  }

  if (showEnd) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-0">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
        <div className={`${pixelPanel} relative z-10 text-center w-full max-w-xs sm:max-w-md mx-auto`}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 pixel-font text-amber-400">Coming Soon!</h2>
          <p className="mb-4 text-base sm:text-lg text-yellow-800">OriginForge.games survey results and rewards are on the way!</p>
          <div className="flex justify-center mt-4">
            <button className={pixelButton} onClick={onClose}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  const q = surveyQuestions[step];
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-0">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      <div className={`${pixelPanel} relative z-10 w-full max-w-xs sm:max-w-lg mx-auto text-center animate-fade-in`}>
        <div className="mb-2 text-xs sm:text-sm text-yellow-700 font-sans" style={{fontFamily: 'Poppins, Montserrat, Arial, sans-serif'}}>Question {step + 1} / {surveyQuestions.length}</div>
        {q.gameTitle && <div className="text-base sm:text-lg font-bold mb-1 pixel-font text-yellow-600">{q.gameTitle}</div>}
        <div className="text-lg sm:text-2xl font-extrabold mb-2" style={{fontFamily: 'Poppins, Montserrat, Arial, sans-serif', color: '#181818', letterSpacing: '0.01em'}}>{q.question}</div>
        {q.description && <div className="mb-2 text-sm sm:text-base text-yellow-900 font-sans" style={{fontFamily: 'Poppins, Montserrat, Arial, sans-serif'}}>{q.description}</div>}
        {q.humor && <div className="mb-2 text-xs italic text-yellow-700 font-sans" style={{fontFamily: 'Poppins, Montserrat, Arial, sans-serif'}}>{q.humor}</div>}
        {q.type === 'email' ? (
          <form
            className="flex flex-col items-center gap-2 mt-4"
            onSubmit={e => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const emailInput = form.elements.namedItem('email') as HTMLInputElement | null;
              const email = emailInput?.value;
              if (email) handleOption(q.id, email);
            }}
          >
            <input
              type="email"
              name="email"
              required
              autoFocus
              className="block w-full max-w-xs mx-auto rounded border-2 border-yellow-700 bg-yellow-50 text-black text-base font-sans px-3 sm:px-4 py-2 pixel-border outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your email"
              style={{fontFamily: 'Poppins, Montserrat, Arial, sans-serif'}}
            />
            <button type="submit" className={pixelButton + " font-bold mt-2"}>
              Next
            </button>
          </form>
        ) : q.type === 'text' ? (
          <form
            className="flex flex-col items-center gap-2 mt-4"
            onSubmit={e => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const textInput = form.elements.namedItem('textanswer') as HTMLTextAreaElement | null;
              const text = textInput?.value;
              if (text) handleOption(q.id, text);
            }}
          >
            <textarea
              name="textanswer"
              required={q.required}
              autoFocus
              rows={3}
              className="block w-full max-w-xs mx-auto rounded border-2 border-yellow-700 bg-yellow-50 text-black text-base font-sans px-3 sm:px-4 py-2 pixel-border outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Type your answer..."
              style={{fontFamily: 'Poppins, Montserrat, Arial, sans-serif'}}
            />
            <button type="submit" className={pixelButton + " font-bold mt-2"}>
              Next
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-2 mt-4">
            {q.options?.map((opt) => (
              <button
                key={opt.id}
                className={
                  pixelButton +
                  (answers[q.id] === opt.value
                    ? " ring-4 ring-yellow-400 bg-yellow-300 text-[#181818]"
                    : " bg-yellow-100 text-[#181818] hover:bg-yellow-200 hover:scale-[1.04] hover:shadow-pixel focus:bg-yellow-200 focus:scale-[1.04] focus:shadow-pixel") +
                  " font-bold pixel-font leading-tight px-4 sm:px-6 py-2 my-1 border-2 border-yellow-700 pixel-border transition-all duration-150 outline-none"
                }
                style={{
                  letterSpacing: '0.01em',
                  boxShadow: '0 2px 0 #fff, 2px 4px 0 #000',
                  borderRadius: '0.25rem',
                }}
                onClick={() => handleOption(q.id, opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
