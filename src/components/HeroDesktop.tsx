import React, { useState, useRef } from 'react';
import Image from 'next/image';

const HeroDesktop: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const [showReadyModal, setShowReadyModal] = useState(false);

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

      <div className="relative z-10 flex flex-col w-full h-full pt-24 pb-12 px-16 xl:px-32 items-start">
        {/* Title and subtitle */}
        <div className="w-full max-w-5xl mb-4 flex flex-col items-start">
          <div
            ref={textRef}
            className="font-press-start flex flex-col items-start w-full select-none"
          >
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
                gap: '17.42px',
                width: '647px',
                height: '165.96px',
                flex: 'none',
                order: 0,
                alignSelf: 'stretch',
                flexGrow: 0
              }}
            >
              <span
                className="whitespace-nowrap text-white text-[3vw] xl:text-[2vw] font-bold text-left tracking-[0.04em] leading-[1.1]"
                style={{
                  marginRight: '0',
                  WebkitTextStroke: '1px #222',
                  textShadow: 'none',
                  width: '100%'
                }}
              >
                FORGE YOUR ULTIMATE
              </span>
              <span
                className="whitespace-nowrap text-yellow-400 text-[2.8vw] xl:text-[2vw] font-bold text-left tracking-[0.13em] leading-[1.1]"
                style={{
                  WebkitTextStroke: '1px #222',
                  textShadow: 'none',
                  maxWidth: '100vw',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'inline-block'
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
                color: '#000000',
                flex: 'none',
                order: 1,
                alignSelf: 'flex-start',
                flexGrow: 0,
                margin: '24px 0 0 0',
                textAlign: 'left'
              }}
            >
              Craft decentralized identities, own achievements, build a verifiable profile.
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-row gap-8 justify-start items-center mt-12 mb-10 w-full max-w-3xl">
          <div className="flex justify-start">
            <div 
              onClick={() => setShowReadyModal(true)}
              className="cursor-pointer hover:opacity-90 transition-opacity inline-block"
              style={{
                width: '220px',
                height: '54px',
                marginRight: '0',
                lineHeight: 0
              }}
            >
              <Image 
                src="/get-started.svg" 
                alt="Get Started" 
                width={220} 
                height={54}
                className="pointer-events-none w-full h-auto"
                priority
              />
            </div>
          </div>
          <div className="flex justify-start">
            <a 
              href="/learn" 
              className="inline-block hover:opacity-90"
              style={{
                width: '340px',
                height: '90px',
                marginLeft: '0',
                marginTop: '20px',
                marginBottom: '53px',
                lineHeight: 0
              }}
            >
              <Image 
                src="/how-it-works.svg" 
                alt="How It Works" 
                width={260} 
                height={64}
                className="pointer-events-none w-full h-auto"
                style={{ color: 'transparent' }}
                priority
              />
            </a>
          </div>
        </div>
        {/* Platform Icons Row */}
        <div className="w-full flex justify-start mt-12">
          <div className="flex flex-row flex-wrap gap-6 justify-start items-center w-full max-w-2xl">
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
        {/* Ready Modal */}
        {showReadyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative text-center">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-black text-xl" onClick={() => setShowReadyModal(false)}>&times;</button>
              <div className="mb-4 flex justify-center">
                <Image src="/logo.svg" alt="OriginForge Logo" width={56} height={56} className="mx-auto" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-yellow-600">Are you ready for the survey?</h2>
              <p className="mb-4 text-gray-700">OriginForge is building the future of gaming identity. Your feedback will help us create a platform where you can own your achievements, build a verifiable profile, and join a new era of decentralized gaming.</p>
              <p className="mb-6 text-gray-600 text-sm">The survey is short, fun, and will only take a minute. Click below to get started!</p>
              <button
                className="hero-btn w-full bg-[#D0941C] text-white font-bold shadow-lg pixel-border hover:bg-[#D0941C] transition text-lg"
                onClick={() => { setShowReadyModal(false); window.location.href = '/survey'; }}
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroDesktop;
