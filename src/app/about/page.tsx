"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import TakeSurveyButton from '../../components/TakeSurveyButton';

export default function AboutPage() {
  const router = useRouter();

  React.useEffect(() => {
    // Prevent page scrolling
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className="w-full relative flex flex-col overflow-hidden"
      style={{
        backgroundImage: 'url(/bg.svg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: '#E5D5A3',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {/* Logo in top-left corner */}
      <div className="absolute top-0 left-0 z-20 p-4 sm:p-6">
        <button
          aria-label="Go to Home"
          onClick={() => router.push('/')}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <Image
            src="/logo.svg"
            alt="OriginForge Logo"
            width={64}
            height={64}
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain cursor-pointer"
            priority
          />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-3 sm:px-6 md:px-8 pt-20 pb-32 sm:pb-40 md:pb-48">
        <div className="w-full max-w-5xl mx-auto flex items-center justify-center" style={{ height: 'calc(100% - 60px)' }}>
          {/* Content Card - Fixed Size */}
          <div
            className="bg-[#FFE5B4] border-4 sm:border-6 md:border-8 border-black rounded-lg shadow-2xl flex flex-col w-full"
            style={{
              boxShadow: '4px 4px 0px #000',
              height: '100%',
              maxHeight: '750px',
            }}
          >
            {/* Scrollable Content Area */}
            <div className="overflow-y-auto p-4 sm:p-6 md:p-10 lg:p-12 flex-1">
              <h1 className="font-press-start text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#8B4513] mb-6 sm:mb-8 text-center leading-relaxed" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}>
                ABOUT ORIGINFORGE
              </h1>

              <div className="space-y-4 sm:space-y-6 text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                <p>
                  <strong>OriginForge</strong> solves a massive $2B+ industry problem: game developers waste $50K-200K building authentication systems while players deal with fragmented gaming identities. We&rsquo;re building the first <strong>gaming-native DID platform</strong> that gives developers instant secure authentication and gives gamers one unified identity across all platforms.
                </p>

                <p>
                  Our dual B2B/B2C approach creates powerful network effects - <strong>more games means better security for everyone</strong>. We&rsquo;re not just another identity provider; we&rsquo;re the infrastructure layer that will power the next generation of gaming.
                </p>

                <p>
                  By 2027, we envision OriginForge as the <strong>LinkedIn for gamers and Stripe for game authentication</strong>. Our roadmap: 500+ games using our platform, millions of verified players, and $8M+ ARR. We&rsquo;re building the decentralized identity infrastructure that becomes the industry standard.
                </p>

                <p className="text-center font-bold text-[#8B4513] text-base sm:text-lg md:text-xl lg:text-2xl mt-8">
                  We&rsquo;re currently in the development phase, building the future of gaming authentication. Join our journey!
                </p>
              </div>

              {/* Take Survey Button */}
              <div className="flex justify-center mt-8 sm:mt-12 mb-4">
                <TakeSurveyButton
                  onClick={() => router.push('/survey')}
                  className="w-full max-w-[280px] sm:max-w-[320px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
