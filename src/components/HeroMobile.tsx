import React, { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import TakeSurveyButton from './TakeSurveyButton';
import AboutUsButton from './AboutUsButton';

const HeroMobile: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const router = useRouter();


  return (
  <section 
    id="hero" 
    className="relative w-full flex flex-col items-center justify-start"
    style={{
      minHeight: '100dvh',
      height: '100dvh',
      backgroundImage: 'url(/bg.svg)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundAttachment: 'scroll',
      backgroundColor: '#E5D5A3',
      overflow: 'hidden',
    }}
  >
      {/* Logo in top-left corner */}
      <div className="fixed top-0 left-0 z-20 p-2 sm:p-3">
        <Image
          src="/logo.svg"
          alt="OriginForge Logo"
          width={64}
          height={64}
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
          priority
        />
      </div>

  <div className="relative z-10 flex flex-col w-full h-full pt-6 pb-0 px-1 sm:px-2 md:px-4 lg:px-6 overflow-hidden">
        {/* Title and subtitle */}
        <div className="w-full max-w-4xl mt-16 mb-2 fixed-content">
          <div
            ref={textRef}
            className="font-press-start flex flex-col items-center w-full select-none"
          >
            <div 
              className="w-full mx-auto text-center px-1"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px',
                flex: 'none',
                order: 0,
                alignSelf: 'center',
                flexGrow: 0
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(22px, 6vw, 42px)',
                  lineHeight: '1.1',
                  color: '#fff',
                  textShadow: '2px 2px 0px #1a1a1a, -2px -2px 0px #1a1a1a, 2px -2px 0px #1a1a1a, -2px 2px 0px #1a1a1a, 1px 1px 0px #1a1a1a, -1px -1px 0px #1a1a1a, 1px -1px 0px #1a1a1a, -1px 1px 0px #1a1a1a',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-press-start)',
                  fontWeight: 'normal',
                  textAlign: 'center',
                  marginBottom: '10px',
                  wordSpacing: '-0.6em',
                }}
              >
                FORGE YOUR
              </div>
              <div
                style={{
                  fontSize: 'clamp(22px, 6vw, 42px)',
                  lineHeight: '1.1',
                  color: '#FFD700',
                  textShadow: '2px 2px 0px #1a1a1a, -2px -2px 0px #1a1a1a, 2px -2px 0px #1a1a1a, -2px 2px 0px #1a1a1a, 1px 1px 0px #1a1a1a, -1px -1px 0px #1a1a1a, 1px -1px 0px #1a1a1a, -1px 1px 0px #1a1a1a',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-press-start)',
                  fontWeight: 'normal',
                  textAlign: 'center',
                  wordSpacing: '-0.6em',
                }}
              >
                GAMING LEGACY
              </div>
            </div>
            <div
              style={{
                width: '100%',
                maxWidth: '600px',
                fontFamily: 'var(--font-geist-mono)',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '125%',
                textTransform: 'uppercase',
                color: '#000',
                WebkitTextFillColor: '#000',
                flex: 'none',
                order: 1,
                alignSelf: 'center',
                flexGrow: 0,
                margin: '16px 0 0 0',
                textAlign: 'center'
              }}
            >
              Craft decentralized identities, own achievements, build a verifiable profile.
            </div>
          </div>
        </div>

        {/* Buttons Container */}
        <div className="buttons-wrapper mt-4 mb-4 py-2 fixed-content">
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

        {/* Launch Soon Signboard */}
        <div className="w-full flex justify-center items-end flex-grow mt-4 fixed-content">
          <div className="relative">
            <Image 
              src="/launch_soon.svg" 
              alt="Launch Soon" 
              width={600} 
              height={500} 
              className="w-88 sm:w-[400px] md:w-[450px] h-auto object-contain" 
              priority 
              style={{
                transform: 'scale(1.3)',
                transformOrigin: 'bottom center',
                marginBottom: '80px',
                willChange: 'auto'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroMobile;
