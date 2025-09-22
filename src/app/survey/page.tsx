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
      <div
        className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto px-6 sm:px-10 py-4 flex flex-col items-center justify-center"
        style={{
          backgroundImage: 'url(/form-bg.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '1rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          margin: '0 auto',
        }}
      >
        <SurveySlider />
      </div>
    </main>
  );
}
