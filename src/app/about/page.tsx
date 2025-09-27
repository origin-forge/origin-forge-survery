"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div 
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: 'url(/bg.svg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Logo in top-left corner */}
      <div className="absolute top-0 left-0 z-20 p-2 sm:p-4">
        <button
          aria-label="Go to Home Hero Section"
          onClick={() => router.push('/')}
          style={{ background: 'none', border: 'none', boxShadow: 'none', padding: 0, cursor: 'pointer' }}
        >
          <Image src="/logo.svg" alt="OriginForge Logo" width={64} height={64} className="w-12 h-12 sm:w-16 sm:h-16 object-contain cursor-pointer" priority />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 
              className="font-press-start text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
              style={{
                WebkitTextStroke: '2px #000',
                textShadow: '0 2px 4px #000',
                color: '#FFD700',
                WebkitTextFillColor: '#FFD700'
              }}
            >
              ABOUT ORIGINFORGE
            </h1>
            <div 
              className="text-black text-lg sm:text-xl font-bold"
              style={{
                fontFamily: 'BB Torsos Pro, sans-serif',
                textTransform: 'uppercase',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              Forging the Future of Gaming Identity
            </div>
          </div>

          {/* Content Card */}
          <div 
            className="bg-white border-4 border-black rounded-lg p-6 sm:p-8 shadow-2xl"
            style={{
              boxShadow: '0 0 0 3px #000, 0 0 0 7px #fff, 0 0 0 11px #000',
              borderRadius: '1rem'
            }}
          >
            {/* Mission Section */}
            <div className="mb-8">
              <h2 
                className="font-press-start text-2xl sm:text-3xl text-yellow-700 mb-4"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
              >
                🎮 OUR MISSION
              </h2>
              <p className="text-gray-800 text-base sm:text-lg leading-relaxed mb-4">
                OriginForge is revolutionizing the gaming world by creating a unified, blockchain-secured platform 
                where gamers can consolidate all their achievements, progress, and gaming identity across every platform 
                they play on. No more scattered achievements across Steam, PlayStation, Xbox, and other platforms.
              </p>
              <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
                We believe every gamer deserves to own their digital legacy and showcase their complete gaming journey 
                in one powerful, verifiable profile.
              </p>
            </div>

            {/* Vision Section */}
            <div className="mb-8">
              <h2 
                className="font-press-start text-2xl sm:text-3xl text-yellow-700 mb-4"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
              >
                🚀 OUR VISION
              </h2>
              <p className="text-gray-800 text-base sm:text-lg leading-relaxed mb-4">
                Imagine a world where your gaming achievements are truly yours - stored on the blockchain, 
                verifiable, and transferable. Where you can prove your gaming prowess with cryptographic certainty, 
                and where your digital gaming identity transcends individual platforms.
              </p>
              <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
                OriginForge will be the universal gaming passport that connects all your gaming experiences 
                into one epic, verifiable story.
              </p>
            </div>

            {/* Features Section */}
            <div className="mb-8">
              <h2 
                className="font-press-start text-2xl sm:text-3xl text-yellow-700 mb-4"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
              >
                ⚡ KEY FEATURES
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4">
                  <h3 className="font-press-start text-lg text-yellow-800 mb-2">🏆 Unified Achievements</h3>
                  <p className="text-gray-700 text-sm">All your gaming achievements in one place, regardless of platform</p>
                </div>
                <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4">
                  <h3 className="font-press-start text-lg text-yellow-800 mb-2">🔐 Blockchain Security</h3>
                  <p className="text-gray-700 text-sm">Your gaming data is secured and owned by you, not the platforms</p>
                </div>
                <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4">
                  <h3 className="font-press-start text-lg text-yellow-800 mb-2">🎨 NFT Achievements</h3>
                  <p className="text-gray-700 text-sm">Rare achievements become verifiable NFTs you truly own</p>
                </div>
                <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4">
                  <h3 className="font-press-start text-lg text-yellow-800 mb-2">🌐 Cross-Platform</h3>
                  <p className="text-gray-700 text-sm">Works with Steam, PlayStation, Xbox, Nintendo, and more</p>
                </div>
              </div>
            </div>

            {/* Technology Section */}
            <div className="mb-8">
              <h2 
                className="font-press-start text-2xl sm:text-3xl text-yellow-700 mb-4"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
              >
                🔧 TECHNOLOGY
              </h2>
              <p className="text-gray-800 text-base sm:text-lg leading-relaxed mb-4">
                Built on cutting-edge blockchain technology, OriginForge uses smart contracts to securely 
                verify and store your gaming achievements. Our platform integrates with major gaming APIs 
                to automatically sync your progress while maintaining complete privacy and security.
              </p>
              <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
                We're leveraging the power of decentralized technology to give gamers true ownership 
                of their digital gaming identity for the first time in history.
              </p>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <h2 
                className="font-press-start text-2xl sm:text-3xl text-yellow-700 mb-6"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
              >
                🎯 JOIN THE REVOLUTION
              </h2>
              <p className="text-gray-800 text-base sm:text-lg leading-relaxed mb-6">
                Ready to forge your ultimate gaming legacy? Take our survey to help shape the future 
                of gaming identity and be among the first to experience OriginForge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => router.push('/survey')}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-press-start px-8 py-4 rounded-lg border-4 border-black shadow-lg transition-colors duration-200 text-lg"
                  style={{
                    boxShadow: '0 4px 0 #000, 0 4px 8px rgba(0,0,0,0.3)'
                  }}
                >
                  TAKE SURVEY
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-press-start px-8 py-4 rounded-lg border-4 border-black shadow-lg transition-colors duration-200 text-lg"
                  style={{
                    boxShadow: '0 4px 0 #000, 0 4px 8px rgba(0,0,0,0.3)'
                  }}
                >
                  BACK TO HOME
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-white text-sm font-press-start" style={{ textShadow: '0 1px 2px #000' }}>
              © 2024 OriginForge. Forging the future of gaming identity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
