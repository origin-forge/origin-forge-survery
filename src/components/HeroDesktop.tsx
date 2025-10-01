import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import TakeSurveyButton from './TakeSurveyButton';

const HeroDesktop: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleTakeSurvey = () => {
    setIsLoading(true);
    router.push('/survey');
  };


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
      <div className="relative z-10 flex w-full h-full pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 gap-8">
        {/* First Column - Main Content (70% width) */}
        <div className="w-[70%] flex flex-col justify-center pl-8 sm:pl-12 md:pl-16 lg:pl-20 xl:pl-24 pr-4">
          {/* Title and Subtitle Section */}
          <div className="w-full flex flex-col items-start max-w-3xl">
            {/* Main Title Text */}
            <div className="w-full mb-4 sm:mb-6">
              <div className="font-press-start leading-tight">
                <div 
                  style={{
                    fontSize: 'clamp(24px, 5vw, 58px)',
                    lineHeight: '1.1',
                    color: '#fff',
                    textShadow: '3px 3px 0px #1a1a1a, -3px -3px 0px #1a1a1a, 3px -3px 0px #1a1a1a, -3px 3px 0px #1a1a1a, 2px 2px 0px #1a1a1a, -2px -2px 0px #1a1a1a, 2px -2px 0px #1a1a1a, -2px 2px 0px #1a1a1a, 1px 1px 0px #1a1a1a, -1px -1px 0px #1a1a1a, 1px -1px 0px #1a1a1a, -1px 1px 0px #1a1a1a',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '0.4em',
                    wordSpacing: '-0.6em',
                  }}
                >
                  FORGE YOUR 
                </div>
                <div 
                  style={{
                    fontSize: 'clamp(24px, 5vw, 58px)',
                    lineHeight: '1.1',
                    color: '#FFD700',
                    textShadow: '3px 3px 0px #1a1a1a, -3px -3px 0px #1a1a1a, 3px -3px 0px #1a1a1a, -3px 3px 0px #1a1a1a, 2px 2px 0px #1a1a1a, -2px -2px 0px #1a1a1a, 2px -2px 0px #1a1a1a, -2px 2px 0px #1a1a1a, 1px 1px 0px #1a1a1a, -1px -1px 0px #1a1a1a, 1px -1px 0px #1a1a1a, -1px 1px 0px #1a1a1a',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    wordSpacing: '-0.3em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  GAMING LEGACY
                </div>
              </div>
            </div>
            
            {/* Subtitle and Buttons Section */}
            <div className="w-full flex flex-col items-start">
              {/* Subtitle */}
              <div 
                className="mb-6 sm:mb-8 w-full"
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: 'clamp(17px, 3vw, 20px)',
                  lineHeight: '125%',
                  textTransform: 'uppercase',
                  color: '#000',
                  maxWidth: '800px',
                  whiteSpace: 'nowrap',
                }}
              >
                Craft decentralized identities, own achievements, build a <br />verifiable profile.
              </div>
              
              {/* Take Survey Button */}
              <div className="flex flex-row gap-4 sm:gap-6 mt-4 sm:mt-6 mb-4 sm:mb-6">
                <div className="button-container">
                  <TakeSurveyButton
                    onClick={handleTakeSurvey}
                    className="w-full"
                    isLoading={isLoading}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>

         
        </div>

        {/* Second Column - Launch Soon Image (30% width) */}
        <div className="w-[30%] flex items-end justify-center pb-0 pr-8 sm:pr-12 md:pr-16 lg:pr-20 xl:pr-24">
          <div className="relative w-full flex items-end justify-center">
            <Image
              src="/launch_soon.svg"
              alt="Launch Soon"
              width={1800}
              height={2000}
              className="w-full h-auto max-w-none object-contain coming-soon-image"
              priority
              style={{
                objectFit: 'contain',
                objectPosition: 'bottom center',
                minHeight: '900px',
                transform: 'scale(2.2)',
                transformOrigin: 'bottom center',
                marginBottom: '35px',
              }}
            />
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .coming-soon-image {
          /* Default styles already in inline style */
        }
        
        /* 14-inch Mac specific styles (1440px) */
        @media (min-width: 1440px) and (max-width: 1600px) {
          .coming-soon-image {
            transform: scale(2.3) !important;
            min-height: 950px !important;
            margin-bottom: -10px !important;
          }
        }
        
        /* Large screens (1600px and up) */
        @media (min-width: 1600px) {
          .coming-soon-image {
            transform: scale(2.5) !important;
            min-height: 1000px !important;
            margin-bottom: -25px !important;
          }
        }
        
        /* Medium-large screens (1200px to 1439px) */
        @media (min-width: 1200px) and (max-width: 1439px) {
          .coming-soon-image {
            transform: scale(2.2) !important;
            min-height: 900px !important;
            margin-bottom: -16px !important;
          }
        }
        
        /* Medium screens (1024px to 1199px) */
        @media (min-width: 1024px) and (max-width: 1199px) {
          .coming-soon-image {
            transform: scale(1.9) !important;
            min-height: 800px !important;
            margin-bottom: -12px !important;
          }
        }
        
        /* Small-medium screens (768px to 1023px) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .coming-soon-image {
            transform: scale(1.6) !important;
            min-height: 700px !important;
            margin-bottom: -8px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroDesktop;
