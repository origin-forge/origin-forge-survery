import React, { useState } from 'react';
import SurveyCardWrapper from './SurveyCardWrapper';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import TakeSurveyButton from './TakeSurveyButton';
import AboutUsButton from './AboutUsButton';

const HeroDesktop: React.FC = () => {
  const [showSurvey, setShowSurvey] = useState(false);
  const router = useRouter();

  if (showSurvey) {
    return <SurveyCardWrapper />;
  }

  return (
    <section id="hero" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Logo in top-left corner */}
      <div className="absolute top-0 left-0 z-20 p-2 sm:p-4">
        <Image
          src="/logo.svg"
          alt="OriginForge Logo"
          width={80}
          height={80}
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
          priority
        />
      </div>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/bg.png"
          alt="Background"
          fill
          className="object-cover w-full h-full"
          priority
          quality={100}
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 flex flex-col w-full h-full pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 2xl:px-32">
        {/* Main Content Container */}
        <div className="w-full flex flex-col items-center">
          {/* Title and Subtitle Section */}
          <div className="w-full max-w-4xl px-4 flex flex-col items-center">
            {/* Main Title SVG */}
            <div className="w-full flex justify-center -mb-1 sm:-mb-2 md:-mb-3">
              <div className="relative w-full max-w-5xl md:max-w-6xl" style={{ height: '180px', minHeight: '180px', maxHeight: '250px' }}>
                <Image
                  src="/text.svg"
                  alt="FORGE YOUR ULTIMATE GAMING LEGACY"
                  fill
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                  priority
                />
              </div>
            </div>
            
            {/* Subtitle and Buttons Section */}
            <div className="w-full flex flex-col items-center">
              {/* Subtitle */}
              <div 
                className="text-center mb-6 sm:mb-8 w-full px-2 sm:px-4"
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: 'clamp(12px, 3vw, 18px)',
                  lineHeight: '125%',
                  textTransform: 'uppercase',
                  color: '#000',
                  whiteSpace: 'nowrap',
                  width: '100%',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                Craft decentralized identities, own achievements, build a verifiable profile.
              </div>
              
              {/* Take Survey and About Us Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mt-6 sm:mt-8 mb-6 sm:mb-8">
                <TakeSurveyButton
                  onClick={() => router.push('/survey')}
                  className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-xs"
                />
                <AboutUsButton
                  onClick={() => router.push('/about')}
                  className="w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px]"
                />
              </div>
            </div>
          </div>

          {/* Platform Icons Row */}
          <div className="w-full flex justify-center mt-2 sm:mt-4 px-2">
            <div className="flex flex-row flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center items-center w-full max-w-md">
              <span className="inline-flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 transition group">
                <Image 
                  src="/steam.svg" 
                  alt="Steam" 
                  width={150} 
                  height={150} 
                  className="w-full h-auto transition platform-icon group-hover:platform-icon-hover" 
                />
              </span>
              <span className="inline-flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 transition group">
                <Image 
                  src="/ps.svg" 
                  alt="PlayStation" 
                  width={150} 
                  height={150} 
                  className="w-full h-auto transition platform-icon group-hover:platform-icon-hover" 
                />
              </span>
              <span className="inline-flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 transition group">
                <Image 
                  src="/xbox.svg" 
                  alt="Xbox" 
                  width={150} 
                  height={150} 
                  className="w-full h-auto transition platform-icon group-hover:platform-icon-hover" 
                />
              </span>
            </div>
          </div>

          {/* Coming Soon SVG - Positioned absolutely within the hero section */}
          <div className="absolute right-4 sm:right-8 md:right-12 lg:right-20 bottom-12 sm:bottom-16 md:bottom-20 z-30" style={{ pointerEvents: 'none' }}>
            <div className="relative" style={{ height: 'auto', width: '100%' }}>
              <Image 
                src="/coming-soon.svg" 
                alt="Coming Soon" 
                width={300} 
                height={112} 
                className="w-36 sm:w-48 md:w-56 lg:w-64 h-auto object-contain transition-transform hover:scale-105" 
                priority
                style={{ 
                  position: 'relative',
                  bottom: 0,
                  right: 0,
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'block',
                  pointerEvents: 'auto'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDesktop;
