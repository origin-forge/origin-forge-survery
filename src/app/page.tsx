"use client"


import { useState } from 'react';

import Hero from '@/components/Hero';
import dynamic from 'next/dynamic';
const SurveySlider = dynamic(() => import('@/components/SurveySlider'), { ssr: false });

export default function Home() {
  const [showSurvey, setShowSurvey] = useState(false)


  if (showSurvey) {
    return (
      <SurveySlider 
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
