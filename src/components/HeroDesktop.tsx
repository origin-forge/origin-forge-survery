
import React, { useRef, useState } from 'react';
import SurveySection from './SurveySection';
import Image from 'next/image';

const HeroDesktop: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const [showSurvey, setShowSurvey] = useState(false);

  if (showSurvey) {
    return <SurveySection />;
  }

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden md:overflow-x-hidden">
      {/* Logo in top-left corner */}
      <div className="absolute top-0 left-0 z-20 p-4">
        <Image
          src="/logo.svg"
          alt="OriginForge Logo"
          width={80}
          height={80}
          className="w-16 h-16 object-contain"
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

      <div className="relative z-10 flex flex-col w-full h-full pt-24 pb-12 px-8 xl:px-32 items-center">
        {/* Title and subtitle */}
        <div className="w-full max-w-5xl mb-4 flex flex-col items-center">
          <div
            ref={textRef}
            className="font-press-start flex flex-col items-center w-full select-none"
          >
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0px 8px',
                gap: '20px',
                width: '100%',
                flex: 'none',
                order: 0,
                alignSelf: 'center',
                flexGrow: 0
              }}
            >
              <span
                className="break-words text-black text-[3vw] xl:text-[2vw] font-bold text-center tracking-[0.04em] leading-[1.1]"
                style={{
                  marginRight: '0',
                  WebkitTextStroke: '2px #000',
                  textShadow: '0 0 2px #000, 0 2px 2px #000, 2px 0 2px #000, -2px 0 2px #000, 2px 2px 2px #000, -2px -2px 2px #000',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  width: '100%',
                  color: '#000'
                }}
              >
                FORGE YOUR ULTIMATE
              </span>
              <span
                className="whitespace-nowrap text-[2.8vw] xl:text-[2vw] font-bold text-center tracking-[0.13em] leading-[1.1]"
                style={{
                  WebkitTextStroke: '2px #000',
                  textShadow: '0 0 2px #000, 0 2px 2px #000, 2px 0 2px #000, -2px 0 2px #000, 2px 2px 2px #000, -2px -2px 2px #000',
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
                maxWidth: '800px',
                fontFamily: 'BB Torsos Pro, sans-serif',
                fontStyle: 'normal',
                fontWeight: 450,
                fontSize: '22px',
                lineHeight: '125%',
                textTransform: 'uppercase',
                color: '#000',
                WebkitTextFillColor: '#000',
                flex: 'none',
                order: 1,
                alignSelf: 'center',
                flexGrow: 0,
                margin: '24px 0 0 0',
                textAlign: 'center'
              }}
            >
              Craft decentralized identities, own achievements, build a verifiable profile.
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-6 justify-start items-center mt-8 mb-10 w-full max-w-2xl">
          <div className="w-full sm:w-auto flex justify-center sm:block">
            <div 
              className="inline-block"
              style={{
                width: '220px',
                maxWidth: '220px',
                height: '54px',
                marginRight: '0',
                marginBottom: '4px',
                lineHeight: 0
              }}
            >
              <button
                style={{ width: '100%', height: '100%', background: 'transparent', border: 'none', padding: 0 }}
                onClick={() => setShowSurvey(true)}
              >
                <Image 
                  src="/get-started.svg" 
                  alt="Get Started" 
                  width={220} 
                  height={54}
                  className="pointer-events-none w-full h-auto"
                  priority
                />
              </button>
            </div>
          </div>
          <div className="w-full sm:w-auto flex justify-center sm:block">
            <a 
              href="/learn" 
              className="inline-block hover:opacity-90"
              style={{
                width: '340px',
                maxWidth: '340px',
                height: '90px',
                marginLeft: '0',
                marginBottom: '32px',
                lineHeight: 0,
                background: 'transparent',
              }}
            >
              <Image 
                src="/how-it-works.svg" 
                alt="How It Works" 
                width={260} 
                height={64}
                className="pointer-events-none w-full h-auto"
                style={undefined}
                priority
              />
            </a>
          </div>
          {/* Platform Icons Row */}
          <div className="w-full flex justify-center mt-8">
            <div className="flex flex-row flex-wrap gap-4 justify-center items-center w-full max-w-md">
              <span className="inline-flex items-center justify-center w-32 h-32 transition group">
                <Image src="/steam.svg" alt="Steam" width={150} height={150} className="w-full h-auto transition platform-icon group-hover:platform-icon-hover" />
              </span>
              <span className="inline-flex items-center justify-center w-32 h-32 transition group">
                <Image src="/ps.svg" alt="PlayStation" width={150} height={150} className="w-full h-auto transition platform-icon group-hover:platform-icon-hover" />
              </span>
              <span className="inline-flex items-center justify-center w-32 h-32 transition group">
                <Image src="/xbox.svg" alt="Xbox" width={150} height={150} className="w-full h-auto transition platform-icon group-hover:platform-icon-hover" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDesktop;
