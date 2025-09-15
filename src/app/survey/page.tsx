import SurveySlider from '@/components/SurveySlider';

import Image from 'next/image';

export default function SurveyPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* SVG Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/bg.png"
          alt="Background pattern"
          fill
          className="object-cover"
          quality={100}
          priority
        />
      </div>
      <div className="relative z-10 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto px-2 sm:px-4 py-4 flex flex-col items-center justify-center">
        <SurveySlider />
      </div>
    </main>
  );
}
