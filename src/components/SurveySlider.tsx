import React, { useState } from "react";
import { surveyQuestions } from "../data/surveyQuestions";

const pixelPanel =
  "border-4 border-yellow-700 bg-yellow-100 shadow-lg rounded-lg p-6 pixel-border";
const pixelButton =
  "hero-btn bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#281A25] font-bold shadow-lg pixel-border hover:from-yellow-500 hover:to-yellow-700 transition px-6 py-2 mt-4";

export default function SurveySlider({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [showEnd, setShowEnd] = useState(false);

  const handleOption = (qid: number, value: string) => {
    setAnswers((prev: any) => ({ ...prev, [qid]: value }));
    if (step < surveyQuestions.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 350);
    } else {
      setTimeout(() => setShowEnd(true), 350);
    }
  };

  if (showEnd) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
        <div className={`${pixelPanel} relative z-10 text-center max-w-md mx-auto`}>
          <h2 className="text-3xl font-bold mb-2 pixel-font text-amber-400">Coming Soon!</h2>
          <p className="mb-4 text-lg text-yellow-800">OriginForge.games survey results and rewards are on the way!</p>
          <div className="flex justify-center mt-4">
            <button className={pixelButton} onClick={onClose}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  const q = surveyQuestions[step];
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      <div className={`${pixelPanel} relative z-10 max-w-lg w-full mx-auto text-center animate-fade-in`}>
        <div className="mb-2 text-xs text-yellow-700 font-sans" style={{fontFamily: 'Poppins, Montserrat, Arial, sans-serif'}}>Question {step + 1} / {surveyQuestions.length}</div>
        {q.gameTitle && <div className="text-lg font-bold mb-1 pixel-font text-yellow-600">{q.gameTitle}</div>}
        <div className="text-2xl font-extrabold mb-2" style={{fontFamily: 'Poppins, Montserrat, Arial, sans-serif', color: '#181818', letterSpacing: '0.01em'}}>{q.question}</div>
        {q.description && <div className="mb-2 text-base text-yellow-900 font-sans" style={{fontFamily: 'Poppins, Montserrat, Arial, sans-serif'}}>{q.description}</div>}
        {q.humor && <div className="mb-2 text-xs italic text-yellow-700 font-sans" style={{fontFamily: 'Poppins, Montserrat, Arial, sans-serif'}}>{q.humor}</div>}
        {q.type === 'email' ? (
          <form
            className="flex flex-col items-center gap-2 mt-4"
            onSubmit={e => {
              e.preventDefault();
              const email = (e.target as any).elements.email.value;
              if (email) handleOption(q.id, email);
            }}
          >
            <input
              type="email"
              name="email"
              required
              autoFocus
              className="block w-full max-w-xs mx-auto rounded border-2 border-yellow-700 bg-yellow-50 text-black text-base font-sans px-4 py-2 pixel-border outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your email"
              style={{fontFamily: 'Poppins, Montserrat, Arial, sans-serif'}}
            />
            <button type="submit" className={pixelButton + " text-base font-bold mt-2"}>
              Next
            </button>
          </form>
        ) : q.type === 'text' ? (
          <form
            className="flex flex-col items-center gap-2 mt-4"
            onSubmit={e => {
              e.preventDefault();
              const text = (e.target as any).elements.textanswer.value;
              if (text) handleOption(q.id, text);
            }}
          >
            <textarea
              name="textanswer"
              required={q.required}
              autoFocus
              rows={3}
              className="block w-full max-w-xs mx-auto rounded border-2 border-yellow-700 bg-yellow-50 text-black text-base font-sans px-4 py-2 pixel-border outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Type your answer..."
              style={{fontFamily: 'Poppins, Montserrat, Arial, sans-serif'}}
            />
            <button type="submit" className={pixelButton + " text-base font-bold mt-2"}>
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
                  " text-base font-bold pixel-font leading-tight px-6 py-2 my-1 border-2 border-yellow-700 pixel-border transition-all duration-150 outline-none"
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
