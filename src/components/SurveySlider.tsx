"use client";
import React, { useState, useEffect } from "react";
import { surveyQuestions } from "../data/surveyQuestions";
import { saveSurveyResponse } from "../lib/supabase";

const pixelPanel = "bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl";
const optionButton = "w-full text-left p-4 mb-3 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200 text-gray-800 font-medium";
const selectedOption = "border-blue-500 bg-blue-50";
const nextButton = "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 mt-6";

type Answers = Record<number, string | string[]>;

export default function SurveySlider({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showEnd, setShowEnd] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [progress, setProgress] = useState(0);
  const currentQuestion = surveyQuestions[step];

  useEffect(() => {
    // Calculate progress percentage
    const newProgress = (step / surveyQuestions.length) * 100;
    setProgress(newProgress);
  }, [step]);

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

  if (showEnd) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-0">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
        <div className={`${pixelPanel} relative z-10 text-center w-full max-w-xs sm:max-w-md mx-auto`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You! 🎉</h2>
          <p className="text-gray-600 mb-6">Your responses have been recorded. We&apos;ll be in touch soon!</p>
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors duration-200"
          >
            Finish
          </button>
        </div>
      </div>
    );
  }

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


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-0">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      <div className={`${pixelPanel} relative z-10 w-full max-w-xs sm:max-w-lg mx-auto text-center animate-fade-in`}>
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs sm:text-sm text-yellow-700 font-sans" style={{fontFamily: 'Poppins, Montserrat, Arial, sans-serif'}}>
            Question {step + 1} of {surveyQuestions.length}
          </div>
        </div>
        
        {currentQuestion.type === 'email' ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const email = formData.get('email') as string;
              handleOption(currentQuestion.id, email);
            }}
            className="w-full"
          >
            <input
              type="email"
              name="email"
              required
              autoFocus
              className="block w-full max-w-xs mx-auto rounded border-2 border-gray-300 bg-white text-black text-base px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter your email"
            />
          </form>
        ) : (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <button
                key={option.id}
                className={`${optionButton} ${
                  answers[currentQuestion.id] === option.value ? selectedOption : ''
                }`}
                onClick={() => handleOption(currentQuestion.id, option.value)}
              >
                {option.emoji && <span className="mr-2">{option.emoji}</span>}
                {option.label}
              </button>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-8">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="text-blue-600 hover:text-blue-800 font-medium px-4 py-2"
            >
              ← Back
            </button>
          ) : <div />}
          
          {step < surveyQuestions.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className={nextButton}
              disabled={!answers[currentQuestion.id]}
            >
              Next Question →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleOption(currentQuestion.id, '')}
              className={nextButton}
              disabled={!answers[currentQuestion.id]}
            >
              Submit Survey
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
