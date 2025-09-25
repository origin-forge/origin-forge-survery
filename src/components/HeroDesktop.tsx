import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const HeroDesktop: React.FC = () => {
  const router = useRouter();

  return (
    <section id="hero" className="relative min-h-[60vh] w-full flex flex-col items-center justify-center overflow-hidden">
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

      <div className="relative z-10 flex flex-col w-full h-full pt-24 pb-12 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
        {/* Main Content Container */}
        <div className="w-full flex flex-col items-center">
          {/* Title and Subtitle Section */}
          <div className="w-full max-w-4xl px-4 flex flex-col items-center">
            {/* Main Title SVG */}
            <div className="w-full flex justify-center -mb-3">
              <div className="relative w-full max-w-6xl" style={{ height: '250px' }}>
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
                className="text-center mb-8"
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontWeight: 400,
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  color: '#000',
                  whiteSpace: 'nowrap',
                  width: '100%',
                  overflow: 'visible',
                  padding: '0 20px'
                }}
              >
                Craft decentralized identities, own achievements, build a verifiable profile.
              </div>
              
              {/* Take Survey Button Centered */}
              <div className="flex flex-col items-center justify-center w-full mt-8 mb-8">
                <button
                  style={{ background: 'transparent', border: 'none', padding: 0, boxShadow: 'none', borderRadius: 0 }}
                  onClick={() => router.push('/survey')}
                >
                  <Image 
                    src="/take-survey.png" 
                    alt="Take Survey" 
                    width={240} 
                    height={70}
                    className="w-full max-w-xs h-auto mx-auto"
                    priority
                  />
                </button>
              </div>

              {/* Platform Icons Row */}
              <div className="w-full flex justify-center mt-4">
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

              {/* Coming Soon SVG */}
              <div className="w-full flex justify-center mt-8">
                <Image src="/coming-soon.svg" alt="Coming Soon" width={160} height={60} className="w-48 h-auto object-contain" priority />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDesktop;
