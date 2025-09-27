"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  // Prevent scrolling on /about by setting overflow hidden on html and body
  React.useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, []);
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('mission');

  const navigationItems = [
    { id: 'mission', label: 'Our Mission', icon: '/our-mission.png' },
    { id: 'vision', label: 'Our Vision', icon: '/our-vision.png' },
    { id: 'features', label: 'Key Features', icon: '/features.png' },
    { id: 'technology', label: 'Technology', icon: '/technology.png' },
    { id: 'join', label: 'Join Us', icon: '/join-us.png' }
  ];

  const showSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsSidebarOpen(false);
  };

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden flex flex-col md:flex-row"
      style={{
        backgroundImage: 'url(/bg.svg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        overflow: 'hidden',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      {/* Logo in top-left corner, slightly right on mobile only */}
      <div
        className="absolute top-0 left-0 z-30 p-2 sm:p-4"
        style={{ left: '16px' }}
      >
        <style>{`
          @media (min-width: 640px) {
            .logo-mobile-offset { left: 0 !important; }
          }
        `}</style>
        <div className="logo-mobile-offset" style={{ position: 'relative', left: 0 }}>
          <button
            aria-label="Go to Home Hero Section"
            onClick={() => router.push('/')}
            style={{ background: 'none', border: 'none', boxShadow: 'none', padding: 0, cursor: 'pointer' }}
          >
            <Image src="/logo.svg" alt="OriginForge Logo" width={64} height={64} className="w-12 h-12 sm:w-16 sm:h-16 object-contain cursor-pointer" priority />
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="absolute top-0 right-0 z-30 p-2 sm:p-4 md:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{ background: 'none', border: 'none', padding: 0, boxShadow: 'none', borderRadius: 0 }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="7" r="3" fill="#FFD700" stroke="#000" strokeWidth="2" />
            <circle cx="18" cy="18" r="3" fill="#FFD700" stroke="#000" strokeWidth="2" />
            <circle cx="18" cy="29" r="3" fill="#FFD700" stroke="#000" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className={`fixed inset-y-0 left-0 z-20 w-72 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        borderRight: '6px solid #FFD700',
        boxShadow: '8px 0 0 #000, 12px 0 0 #FFD700, 16px 0 0 #000'
      }}>
        <div className="p-6 h-full flex flex-col">
          {/* Sidebar Header Removed */}

          {/* Navigation Items with PNGs and centered logo */}
          <nav className="flex flex-col items-center justify-center h-full w-full md:w-auto py-4 bg-white/10 md:bg-transparent">
            <div className="flex flex-col w-full items-center justify-center" style={{ gap: '32px' }}>
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => showSection(item.id)}
                  className={`flex items-center justify-center bg-transparent border-none p-0 rounded-md focus:outline-none ${activeSection === item.id ? 'opacity-100 scale-105' : 'opacity-60'} transition-all duration-150`}
                  style={{
                    background: 'none',
                    boxShadow: 'none',
                    border: 'none',
                    padding: 0,
                    margin: '0 auto',
                    touchAction: 'manipulation'
                  }}
                >
                  <Image 
                    src={item.icon} 
                    alt={item.label} 
                    width={180} 
                    height={48} 
                    className="w-[180px] h-[48px] md:w-[260px] md:h-[70px] lg:w-[320px] lg:h-[90px]"
                  />
                </button>
              ))}
            </div>
          </nav>

          {/* Sidebar Footer Removed */}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-2 py-4 md:ml-72 w-full" style={{ overflow: 'hidden', height: '100vh' }}>
        <div className="w-full max-w-4xl mx-auto h-full flex items-center justify-center">
          {/* Content Card: Only show active section */}
          <div 
            className="bg-white border-4 border-black rounded-lg p-4 sm:p-8 shadow-2xl w-full max-w-full overflow-y-auto flex flex-col justify-start items-center"
            style={{
              boxShadow: '0 0 0 3px #000, 0 0 0 7px #fff, 0 0 0 11px #000',
              borderRadius: '1rem',
              minHeight: '60vh',
              maxHeight: 'calc(100vh - 32px)',
              width: '100%',
              paddingTop: '24px',
              paddingBottom: '24px'
            }}
          >
            {activeSection === 'mission' && (
              <div className="w-full text-center md:text-left">
                <h2 className="font-press-start text-xl sm:text-2xl md:text-3xl text-yellow-700 mb-4" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>OUR MISSION</h2>
                <p className="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed mb-4">OriginForge is revolutionizing the gaming world by creating a unified, blockchain-secured platform where gamers can consolidate all their achievements, progress, and gaming identity across every platform they play on. No more scattered achievements across Steam, PlayStation, Xbox, and other platforms.</p>
                <p className="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed">We believe every gamer deserves to own their digital legacy and showcase their complete gaming journey in one powerful, verifiable profile.</p>
              </div>
            )}
            {activeSection === 'vision' && (
              <div className="w-full text-center md:text-left">
                <h2 className="font-press-start text-xl sm:text-2xl md:text-3xl text-yellow-700 mb-4" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>OUR VISION</h2>
                <p className="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed mb-4">Imagine a world where your gaming achievements are truly yours - stored on the blockchain, verifiable, and transferable. Where you can prove your gaming prowess with cryptographic certainty, and where your digital gaming identity transcends individual platforms.</p>
                <p className="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed">OriginForge will be the universal gaming passport that connects all your gaming experiences into one epic, verifiable story.</p>
              </div>
            )}
            {activeSection === 'features' && (
              <div className="w-full text-center md:text-left">
                <h2 className="font-press-start text-xl sm:text-2xl md:text-3xl text-yellow-700 mb-4" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>KEY FEATURES</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4"><h3 className="font-press-start text-base md:text-lg text-yellow-800 mb-2">Unified Achievements</h3><p className="text-gray-700 text-xs md:text-sm">All your gaming achievements in one place, regardless of platform</p></div>
                  <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4"><h3 className="font-press-start text-base md:text-lg text-yellow-800 mb-2">Blockchain Security</h3><p className="text-gray-700 text-xs md:text-sm">Your gaming data is secured and owned by you, not the platforms</p></div>
                  <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4"><h3 className="font-press-start text-base md:text-lg text-yellow-800 mb-2">NFT Achievements</h3><p className="text-gray-700 text-xs md:text-sm">Rare achievements become verifiable NFTs you truly own</p></div>
                  <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4"><h3 className="font-press-start text-base md:text-lg text-yellow-800 mb-2">Cross-Platform</h3><p className="text-gray-700 text-xs md:text-sm">Works with Steam, PlayStation, Xbox, Nintendo, and more</p></div>
                </div>
              </div>
            )}
            {activeSection === 'technology' && (
              <div className="w-full text-center md:text-left">
                <h2 className="font-press-start text-xl sm:text-2xl md:text-3xl text-yellow-700 mb-4" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>TECHNOLOGY</h2>
                <p className="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed mb-4">Built on cutting-edge blockchain technology, OriginForge uses smart contracts to securely verify and store your gaming achievements. Our platform integrates with major gaming APIs to automatically sync your progress while maintaining complete privacy and security.</p>
                <p className="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed">We&apos;re leveraging the power of decentralized technology to give gamers true ownership of their digital gaming identity for the first time in history.</p>
              </div>
            )}
            {activeSection === 'join' && (
              <div className="w-full text-center">
                <h2 className="font-press-start text-xl sm:text-2xl md:text-3xl text-yellow-700 mb-6" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>JOIN THE REVOLUTION</h2>
                <p className="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed mb-6">Ready to forge your ultimate gaming legacy? Take our survey to help shape the future of gaming identity and be among the first to experience OriginForge.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button onClick={() => router.push('/survey')} style={{ background: 'none', border: 'none', padding: 0, boxShadow: 'none', borderRadius: 0 }}>
                    <Image 
                      src="/take-survey.png" 
                      alt="Take Survey" 
                      width={320} 
                      height={90} 
                      className="w-[180px] h-[48px] sm:w-[260px] sm:h-[70px] md:w-[320px] md:h-[90px]" 
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
