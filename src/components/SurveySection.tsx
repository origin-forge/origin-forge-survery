import React, { useState, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const questions = [
  {
    label: "Which gaming platforms do you currently use*?",
    type: "checkbox",
    name: "platforms",
    options: [
      "Steam (PC)", "Xbox (Console/PC)", "PlayStation (PS4/PS5)", "Epic Games Store", "Nintendo Switch", "Mobile Gaming (iOS/Android)", "Other"
    ],
    other: true,
  },
  {
    label: "How often do you play games*?",
    type: "radio",
    name: "frequency",
    options: ["Daily", "Several times a week", "Weekly", "Monthly", "Rarely"],
  },
  {
    label: "Do you care about achievements/trophies in games*?",
    type: "radio",
    name: "achievements",
    options: [
      "Yes, I'm an achievement hunter",
      "Somewhat, I like unlocking them",
      "Not really, but I notice them",
      "No, I ignore them completely"
    ],
  },
  {
    label: "Have you ever felt frustrated that your gaming achievements are scattered across different platforms*?",
    type: "radio",
    name: "frustrated",
    options: ["Yes, all the time!", "Sometimes", "Rarely", "Never thought about it"],
  },
  {
    label: "Would you like to show off ALL your gaming achievements in one place, regardless of their platform*?",
    type: "radio",
    name: "showoff",
    options: ["Absolutely!", "Maybe, sounds interesting", "Not sure", "No, I'm fine with separate platforms"],
  },
  {
    label: "How interested are you in a platform that combines all your gaming achievements into one blockchain-secured profile*?",
    type: "radio",
    name: "interest",
    options: [
      "Very interested - I'd use this immediately",
      "Interested - I'd try it out",
      "Neutral - might check it out",
      "Not interested",
      "What's blockchain?"
    ],
  },
  {
    label: "How much would you be willing to pay for this service*?",
    type: "radio",
    name: "price",
    options: ["$10 - $15", "$16 - $20", "$21 - $25", "$26 - $30"],
  },
  {
    label: "Which feature sounds most appealing to you*?",
    type: "checkbox",
    name: "features",
    options: [
      "Seeing all achievements in one place",
      "NFT rare achievements you actually own",
      "Sharing complete gaming profile with friends",
      "Using it to log into new games"
    ],
  },
  {
    label: "What's your age range*?",
    type: "radio",
    name: "age",
    options: ["Under 18", "18-25", "26-35", "36-45", "46+"],
  },
  {
    label: "Where are you located*?",
    type: "radio",
    name: "location",
    options: ["North America (US/Canada)", "Europe", "Asia-Pacific", "South America", "Africa", "Other"],
    other: true,
  },
  {
    label: "How much do you typically spend on gaming per year*?",
    type: "radio",
    name: "spend",
    options: ["Under $100", "$100-300", "$300-600", "$600-1000", "Over $1000"],
  },
  {
    label: "What's your biggest frustration with current gaming platforms?",
    type: "text",
    name: "frustration",
    maxLength: 200,
  },
  {
    label: "What would make you excited to try OriginForge?",
    type: "text",
    name: "excited",
    maxLength: 200,
  },
  {
    label: "Any other thoughts or questions about unified gaming identity?",
    type: "text",
    name: "thoughts",
    maxLength: 300,
  },
  {
    label: "Want to be notified when OriginForge launches*?",
    type: "radio",
    name: "notify",
    options: ["Yes, keep me updated!", "No thanks"],
  },
  {
    label: "Email*:",
    type: "email",
    name: "email",
  },
  {
    type: "discord",
    name: "discord",
  },
];

const SurveySection: React.FC = () => {
  // Helper to submit answers to Supabase
  const submitSurvey = async () => {
    // Prepare answers for DB
    const payload = { ...answers, submitted_at: new Date().toISOString() };
    const { error } = await supabase.from('survey_responses').insert([payload]);
    if (error) {
      alert('Error submitting survey: ' + error.message);
    } else {
      alert('Survey submitted! Thank you.');
      router.push('/');
    }
  };
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<{[key: string]: string | string[] | undefined}>({});
  const [showDiscord, setShowDiscord] = useState(false);
  // Discord popup state removed

  const current = questions[step];
  const isAnswered = useMemo(() => {
    if (current.type === 'discord') return true;
    const val = answers[current?.name];
    if (Array.isArray(val)) {
      return val.length > 0;
    }
    return val !== undefined && val !== '';
  }, [answers, current]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let checked = false;
    if (type === 'checkbox') {
      checked = (e.target as HTMLInputElement).checked;
      setAnswers(prev => {
        const arr = Array.isArray(prev[name]) ? [...prev[name]] : [];
        if (checked) {
          arr.push(value);
        } else {
          const idx = arr.indexOf(value);
          if (idx > -1) arr.splice(idx, 1);
        }
        return { ...prev, [name]: arr };
      });
    } else {
      setAnswers(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
  <section className="flex flex-col items-center justify-center min-h-screen px-2 py-4 sm:px-4 sm:py-8" style={{backgroundImage: 'url(/bg.svg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
    {/* Centered clickable logo at top */}
    <div className="flex justify-center items-center w-full mb-2">
      <button
        aria-label="Go to Home"
        onClick={() => router.push('/')}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        <Image src="/logo.svg" alt="OriginForge Logo" width={64} height={64} className="mx-auto w-16 h-16 object-contain cursor-pointer" priority />
      </button>
    </div>
    <div className="w-full max-w-md mx-auto">
      <form
        className="pixel-border pixel-corners p-0 w-full flex flex-col gap-6 text-xs sm:text-base border-4 border-yellow-600"
        style={{
          backgroundImage: 'url(/form-bg.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '1rem',
        }}
        onSubmit={e => e.preventDefault()}
      >
          <span className="bg-yellow-300 font-bold px-3 py-1 rounded shadow text-blue-900">{step + 1} / {questions.length}</span>
        {/* Single Question Card */}
        <div className="flex flex-col gap-3">
          <div className="font-press-start text-base sm:text-lg text-yellow-700 mb-2 drop-shadow">{current.label}</div>
          {current.type === 'radio' && current.options && (
            <div className="flex flex-col gap-2">
              {current.options.map(opt => (
                <label key={opt} className="flex items-center gap-2 px-2 py-1 rounded bg-white border border-yellow-200 hover:bg-yellow-100 cursor-pointer text-[#6b4f2c]">
                  <input type="radio" name={current.name} value={opt} checked={answers[current.name] === opt} onChange={handleChange} className="accent-yellow-600" /> {opt}
                </label>
              ))}
            </div>
          )}
          {current.type === 'checkbox' && current.options && (
            <div className="flex flex-col gap-2">
              {current.options.map(opt => (
                <label key={opt} className="flex items-center gap-2 px-2 py-1 rounded bg-white border border-yellow-200 hover:bg-yellow-100 cursor-pointer text-[#6b4f2c]">
                  <input type="checkbox" name={current.name} value={opt} checked={Array.isArray(answers[current.name]) && answers[current.name]?.includes(opt)} onChange={handleChange} className="accent-yellow-600" /> {opt}
                </label>
              ))}
              {current.other && Array.isArray(answers[current.name]) && answers[current.name]?.includes('Other') && (
                <div className="pl-7 pt-2">
                  <input
                    type="text"
                    className="pixel-border border-2 border-yellow-400 rounded-xl px-4 py-3 bg-[#23232b] text-yellow-100 focus:border-yellow-600 font-press-start text-xs sm:text-sm placeholder-yellow-400 shadow w-[260px] sm:w-[320px] h-[44px] sm:h-[52px]"
                    placeholder="Type your answer..."
                    name={current.name + '_other'}
                    value={answers[current.name + '_other'] || ''}
                    onChange={handleChange}
                    maxLength={40}
                  />
                </div>
              )}
            </div>
          )}
          {current.type === 'text' && (
            <textarea maxLength={current.maxLength} className="border-2 border-yellow-300 rounded-xl px-2 py-1 w-full mb-2 bg-white text-yellow-900 focus:border-yellow-600" placeholder={`${current.maxLength} characters max`} name={current.name} value={answers[current.name] || ''} onChange={handleChange} />
          )}
          {current.type === 'email' && (
            <input type="email" name={current.name} className="border-2 border-yellow-300 rounded-xl px-2 py-1 w-full bg-white text-yellow-900 focus:border-yellow-600" required value={answers[current.name] || ''} onChange={handleChange} />
          )}
          {current.type === 'discord' && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-6 text-center font-press-start text-yellow-700 text-base sm:text-lg">Ready to level up your social XP? Our Discord is where the real loot drops!</div>
              <button type="button" className="pixel-button bg-blue-600 text-white px-8 py-4 rounded shadow text-lg font-press-start" onClick={() => window.open('https://discord.gg/your-discord-link', '_blank')}>Join Discord</button>
            </div>
          )}
        </div>
        {/* Navigation Arrows */}
        {current.type !== 'discord' && (
          <div className="flex justify-between mt-4 pb-4">
            <button type="button" className="pixel-button px-4 py-2 bg-yellow-200 text-yellow-900 rounded border-2 border-yellow-400 shadow" disabled={step === 0} onClick={() => setStep(s => Math.max(0, s-1))}>&larr; Back</button>
            {step === questions.length - 2 ? (
              <button
                type="button"
                className="pixel-button px-4 py-2 bg-green-600 text-white rounded border-2 border-green-700 shadow"
                disabled={!isAnswered}
                onClick={submitSurvey}
              >Submit</button>
            ) : (
              <button
                type="button"
                className="pixel-button px-4 py-2 bg-yellow-500 text-white rounded border-2 border-yellow-700 shadow"
                disabled={!isAnswered || step === questions.length-1}
                onClick={() => {
                  setStep(s => Math.min(questions.length-1, s+1));
                }}
              >Next &rarr;</button>
            )}
          </div>
        )}
      </form>
    </div>
  </section>
  );
};

export default SurveySection;
