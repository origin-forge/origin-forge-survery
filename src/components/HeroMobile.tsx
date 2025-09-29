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
    className="relative w-full flex flex-col items-center justify-start overflow-auto"
    style={{
      minHeight: '100dvh',
      backgroundImage: 'url(/bg.svg)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundAttachment: 'local',
      backgroundColor: '#000',
    }}
  >
      {/* Logo in top-left corner */}
      <div className="absolute top-0 left-0 z-20 p-2 sm:p-3">
        <Image
          src="/logo.svg"
          alt="OriginForge Logo"
          width={64}
          height={64}
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
          priority
        />
      </div>

  <div className="relative z-10 flex flex-col w-full min-h-full pt-6 pb-2 px-2 sm:px-4 md:px-8 lg:px-12">
        {/* Title and subtitle */}
        <div className="w-full max-w-4xl mt-16 mb-2">
          <div
            ref={textRef}
            className="font-press-start flex flex-col items-center w-full select-none"
          >
            <div 
              className="w-full mx-auto text-center px-4"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
                flex: 'none',
                order: 0,
                alignSelf: 'center',
                flexGrow: 0
              }}
            >
              <span
                className="whitespace-nowrap text-white text-[4.8vw] sm:text-[4vw] md:text-[3.5vw] lg:text-[2.8vw] xl:text-[2.5vw] font-bold text-center tracking-[0.04em] leading-[1.1]"
                style={{
                  marginRight: '0',
                  marginBottom: '4px',
                  WebkitTextStroke: '1px #000',
                  textShadow: '0 1px 2px #000',
                  color: '#fff',
                  WebkitTextFillColor: '#fff'
                }}
              >
                FORGE YOUR ULTIMATE
              </span>
              <span
                className="whitespace-nowrap text-[6vw] sm:text-[4vw] md:text-[3vw] lg:text-[2.2vw] xl:text-[2vw] font-bold text-center tracking-[0.13em] leading-[1.1]"
                style={{
                  WebkitTextStroke: '1px #000',
                  textShadow: '0 1px 2px #000',
                  maxWidth: '100vw',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'inline-block',
                  color: '#FFD700',
                  WebkitTextFillColor: '#FFD700',
                  background: 'transparent',
                  border: 'none'
                }}
              >
                GAMING LEGACY
              </span>
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
        <div className="buttons-wrapper mt-4 mb-4 py-2">
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

        {/* Platform Icons Row */}
        <div className="w-full flex justify-center mb-2">
          <div className="flex flex-row flex-wrap gap-2 justify-center items-center w-full max-w-xs">
            <span className="inline-flex items-center justify-center w-12 h-12 transition group">
              <Image src="/steam.svg" alt="Steam" width={48} height={48} className="w-full h-auto transition platform-icon group-hover:platform-icon-hover" />
            </span>
            <span className="inline-flex items-center justify-center w-12 h-12 transition group">
              <Image src="/ps.svg" alt="PlayStation" width={48} height={48} className="w-full h-auto transition platform-icon group-hover:platform-icon-hover" />
            </span>
            <span className="inline-flex items-center justify-center w-12 h-12 transition group">
              <Image src="/xbox.svg" alt="Xbox" width={48} height={48} className="w-full h-auto transition platform-icon group-hover:platform-icon-hover" />
            </span>
          </div>
        </div>

        {/* Coming Soon SVG */}
        <div className="w-full flex justify-center mt-2 mb-4">
          <Image src="/coming-soon.svg" alt="Coming Soon" width={200} height={75} className="w-48 h-auto object-contain" priority />
        </div>
      </div>
    </section>
  );
};

export default HeroMobile;
