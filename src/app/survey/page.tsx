import SurveySlider from '@/components/SurveySlider';

import Image from 'next/image';

export default function SurveyPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* SVG Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/bg.svg"
          alt="Background pattern"
          fill
          className="object-cover"
          quality={100}
          priority
        />
      </div>
      <div className="relative z-10 w-full max-w-2xl mx-auto p-4">
        <SurveySlider />
      </div>
    </main>
  );
}
