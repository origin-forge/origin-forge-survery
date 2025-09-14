"use client"


import { useState } from 'react';
import type { SurveyAnswers } from '@/data/surveyQuestions';
import Hero from '@/components/Hero';

export default function Home() {
  const [showSurvey, setShowSurvey] = useState(false)

  const handleSurveyComplete = (answers: SurveyAnswers) => {
    console.log('Survey completed:', answers)
    // Store answers in JSON (will implement proper storage)
    localStorage.setItem('surveyAnswers', JSON.stringify({
      answers,
      timestamp: new Date().toISOString()
    }))
  }

  if (showSurvey) {
    return (
      <Survey 
        onComplete={handleSurveyComplete}
        onClose={() => setShowSurvey(false)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Hero />
    </div>
  );
}
