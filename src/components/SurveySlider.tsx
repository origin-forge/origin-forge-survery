"use client";
import React, { useState, useEffect } from "react";
import { surveyQuestions } from "../data/surveyQuestions";
import { saveSurveyResponse } from "../lib/supabase";

// Pixel art styling
const pixelPanel = "bg-[#FFE5B4] border-4 border-black p-6 w-full max-w-2xl";
const optionButton = "w-full text-left p-6 mb-3 border-4 border-black bg-white hover:bg-[#FFD700] transition-colors duration-200 text-black font-mono text-sm sm:text-base flex items-center";
const selectedOption = "bg-[#FFD700] border-4 border-black font-bold";
const nextButton = "w-full bg-black hover:bg-gray-800 text-white font-mono py-3 px-6 border-4 border-black mt-6 text-sm sm:text-base";

// Pixel art radio button
const PixelRadio = ({ selected }: { selected: boolean }) => (
  <div className={`w-5 h-5 border-2 border-black mr-3 flex-shrink-0 ${selected ? 'bg-black' : 'bg-white'}`}>
    {selected && (
      <div className="w-3 h-3 m-0.5 bg-white border border-black" />
    )}
  </div>
);

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
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6">
        <style jsx global>{`
          @font-face {
            font-family: 'PressStart2P';
            src: url('/PressStart2P-Regular.ttf') format('truetype');
          }
          .pixel-font {
            font-family: 'PressStart2P', monospace;
            font-size: 0.65rem;
            line-height: 1.5;
            letter-spacing: -0.5px;
          }
          @media (min-width: 640px) {
            .pixel-font {
              font-size: 0.75rem;
              line-height: 1.6;
            }
          }
        `}</style>
        <div className="absolute inset-0 bg-[#8B4513]/80" />
        <div className={`${pixelPanel} relative z-10 text-center w-full max-w-xs sm:max-w-md mx-auto flex flex-col`}>
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-[#8B4513] mb-4 sm:mb-6 pixel-font leading-relaxed">
            No emails here, just good vibes and epic loot!
          </h2>

          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            <button
              onClick={() => {
                const tweets = [
                  "Just completed the @OriginForge survey! 🎮 Excited to see what's coming next! #GameDev #IndieGame",
                  "Shared my feedback with @OriginForge! 🚀 Can't wait to see this project evolve! #Gaming #Web3",
                  "Done with the @OriginForge survey! 🎯 Looking forward to the epic loot! #GameFi #Crypto"
                ];
                const randomTweet = tweets[Math.floor(Math.random() * tweets.length)];
                const tweetText = encodeURIComponent(randomTweet);
                window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
              }}
              className="w-full bg-[#D4A574] hover:bg-[#B8935F] text-black font-bold py-3 sm:py-4 px-4 sm:px-6 border-4 border-black pixel-font transition-colors duration-200"
            >
              SHARE ON X!
            </button>

            <button
              onClick={() => window.open('https://discord.gg/your-discord-link', '_blank')}
              className="w-full bg-[#D4A574] hover:bg-[#B8935F] text-black font-bold py-3 sm:py-4 px-4 sm:px-6 border-4 border-black pixel-font transition-colors duration-200"
            >
              JOIN DISCORD
            </button>
          </div>

          <div className="bg-[#FFF8DC] border-4 border-black p-3 sm:p-4">
            <p className="text-[0.6rem] sm:text-xs text-black pixel-font leading-relaxed">
              💡 Post about us on X and collect exclusive goodies from us directly!
            </p>
          </div>
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
      <div className="absolute inset-0 bg-[#8B4513]/80" />
      <div className={`${pixelPanel} relative z-10 w-full max-w-xs sm:max-w-lg mx-auto text-center animate-fade-in`}>
        <style jsx global>{`
          @font-face {
            font-family: 'PressStart2P';
            src: url('/PressStart2P-Regular.ttf') format('truetype');
          }
          .pixel-font {
            font-family: 'PressStart2P', monospace;
            font-size: 0.7rem;
            line-height: 1.4;
            letter-spacing: -0.5px;
          }
          @media (min-width: 640px) {
            .pixel-font {
              font-size: 0.8rem;
            }
          }
        `}</style>
        <div className="mb-6">
            <div className="w-full bg-gray-200 h-3 border-2 border-black mb-2">
              <div 
                className="bg-[#FF6B6B] h-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%`, boxShadow: 'inset 0 0 0 2px #000' }}
              />
            </div>
          <div className="text-xs sm:text-sm text-black pixel-font">
            {step + 1} / {surveyQuestions.length}
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
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              title="Please enter a valid email address"
              className="block w-full max-w-xs mx-auto border-4 border-black bg-white text-black text-sm sm:text-base px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 pixel-font"
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
                <PixelRadio selected={answers[currentQuestion.id] === option.value} />
                {option.emoji && <span className="mr-2">{option.emoji}</span>}
                <span className="pixel-font">{option.label}</span>
              </button>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-8">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-mono py-3 px-6 border-4 border-black text-sm sm:text-base"
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
