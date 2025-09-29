import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import TakeSurveyButton from './TakeSurveyButton';
import AboutUsButton from './AboutUsButton';

const HeroDesktop: React.FC = () => {
  const router = useRouter();


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

      {/* Two Column Layout Container */}
      <div className="relative z-10 flex w-full h-full pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 2xl:px-32 gap-8">
        {/* First Column - Main Content (60% width) */}
        <div className="w-3/5 flex flex-col items-center justify-center pr-8">
          {/* Title and Subtitle Section */}
          <div className="w-full max-w-3xl px-4 flex flex-col items-center">
            {/* Main Title SVG */}
            <div className="w-full flex justify-center -mb-1 sm:-mb-2 md:-mb-3">
              <div className="relative w-full max-w-4xl" style={{ height: '160px', minHeight: '160px', maxHeight: '200px' }}>
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
                  fontSize: 'clamp(11px, 2.5vw, 16px)',
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
              
              {/* About Us and Take Survey Buttons */}
              <div className="buttons-wrapper mt-4 sm:mt-6 mb-4 sm:mb-6">
                <div className="button-container-small">
                  <AboutUsButton
                    onClick={() => router.push('/about')}
                    className="w-full"
                  />
                </div>
                <div className="button-container">
                  <TakeSurveyButton
                    onClick={() => router.push('/survey')}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Platform Icons Row */}
          <div className="w-full flex justify-center mt-4 sm:mt-6 px-2">
            <div className="flex flex-row flex-wrap gap-3 sm:gap-4 md:gap-6 justify-center items-center w-full max-w-sm">
              <span className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 transition group">
                <Image 
                  src="/steam.svg" 
                  alt="Steam" 
                  width={120} 
                  height={120} 
                  className="w-full h-auto transition platform-icon group-hover:platform-icon-hover" 
                />
              </span>
              <span className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 transition group">
                <Image 
                  src="/ps.svg" 
                  alt="PlayStation" 
                  width={120} 
                  height={120} 
                  className="w-full h-auto transition platform-icon group-hover:platform-icon-hover" 
                />
              </span>
              <span className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 transition group">
                <Image 
                  src="/xbox.svg" 
                  alt="Xbox" 
                  width={120} 
                  height={120} 
                  className="w-full h-auto transition platform-icon group-hover:platform-icon-hover" 
                />
              </span>
            </div>
          </div>
        </div>

        {/* Second Column - Launch Soon Image (40% width) */}
        <div className="w-2/5 flex items-end justify-center pl-4 pb-4">
          <div className="relative w-full flex items-end justify-center">
            <Image
              src="/launch_soon.svg"
              alt="Launch Soon"
              width={1000}
              height={1000}
              className="w-full h-auto max-w-none object-contain scale-110"
              priority
              style={{
                objectFit: 'contain',
                objectPosition: 'bottom center',
                minHeight: '500px',
                transform: 'scale(1.2)',
                transformOrigin: 'bottom center',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDesktop;
