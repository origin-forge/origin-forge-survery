"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SidebarMissionButton from '../../components/SidebarMissionButton';
import SidebarVisionButton from '../../components/SidebarVisionButton';
import SidebarFeaturesButton from '../../components/SidebarFeaturesButton';
import SidebarTechnologyButton from '../../components/SidebarTechnologyButton';
import SidebarJoinUsButton from '../../components/SidebarJoinUsButton';
import TakeSurveyButton from '../../components/TakeSurveyButton';

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
    { id: 'mission', label: 'Our Mission', component: SidebarMissionButton },
    { id: 'vision', label: 'Our Vision', component: SidebarVisionButton },
    { id: 'features', label: 'Key Features', component: SidebarFeaturesButton },
    { id: 'technology', label: 'Technology', component: SidebarTechnologyButton },
    { id: 'join', label: 'Join Us', component: SidebarJoinUsButton }
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
      <div className="absolute top-0 right-0 z-30 p-2 sm:p-4 md:hidden" style={{ top: '8px', right: '8px' }}>
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
      <div className={`fixed inset-y-0 left-0 z-20 w-64 sm:w-72 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        borderRight: '6px solid #FFD700',
        boxShadow: '8px 0 0 #000, 12px 0 0 #FFD700, 16px 0 0 #000'
      }}>
        <div className="p-6 h-full flex flex-col" style={{ paddingTop: '80px' }}>
          {/* Sidebar Header Removed */}

          {/* Navigation Items with PNGs and centered logo */}
          <nav className="flex flex-col items-center justify-center h-full w-full md:w-auto py-4 bg-white/10 md:bg-transparent">
            <div className="flex flex-col w-full items-center justify-center" style={{ gap: '32px' }}>
              {navigationItems.map((item) => {
                const ButtonComponent = item.component;
                return (
                  <div
                    key={item.id}
                    className={`${activeSection === item.id ? 'opacity-100 scale-105' : 'opacity-60'} transition-all duration-150`}
                  >
                    <ButtonComponent
                      onClick={() => showSection(item.id)}
                      isActive={activeSection === item.id}
                      className="w-full max-w-[200px]"
                    />
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Sidebar Footer Removed */}
        </div>
      </div>

      {/* Overlay for mobile - transparent clickable area */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-1 sm:px-2 py-4 md:ml-72 w-full" style={{ overflow: 'hidden', height: '100vh', paddingTop: '60px', paddingBottom: '20px' }}>
        <div className="w-full max-w-4xl mx-auto h-full flex items-center justify-center">
          {/* Content Card: Only show active section */}
          <div
            className="bg-white border-2 sm:border-4 border-black rounded-lg p-2 sm:p-4 md:p-8 shadow-2xl w-full max-w-full overflow-y-auto flex flex-col justify-start items-center"
            style={{
              boxShadow: '0 0 0 2px #000, 0 0 0 4px #fff, 0 0 0 6px #000',
              borderRadius: '0.5rem',
              minHeight: '65vh',
              maxHeight: 'calc(100vh - 100px)',
              width: '100%',
              paddingTop: '12px',
              paddingBottom: '12px'
            }}
          >
            {activeSection === 'mission' && (
              <div className="w-full text-center md:text-left description-section">
                <h2 className="font-press-start text-base sm:text-xl md:text-2xl lg:text-3xl text-yellow-700 mb-3 sm:mb-4" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>OUR MISSION</h2>
                <p className="text-gray-800 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-3 sm:mb-4">OriginForge solves a massive $2B+ industry problem: game developers waste $50K-200K building authentication systems while players deal with fragmented gaming identities. We&rsquo;re building the first <strong>gaming-native DID platform</strong> that gives developers instant secure authentication and gives gamers one unified identity across all platforms.</p>
                <p className="text-gray-800 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">Our dual B2B/B2C approach creates powerful network effects - <strong>more games means better security for everyone</strong>. We&rsquo;re not just another identity provider; we&rsquo;re the infrastructure layer that will power the next generation of gaming.</p>
              </div>
            )}
            {activeSection === 'vision' && (
              <div className="w-full text-center md:text-left description-section">
                <h2 className="font-press-start text-base sm:text-xl md:text-2xl lg:text-3xl text-yellow-700 mb-3 sm:mb-4" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>OUR VISION</h2>
                <p className="text-gray-800 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-3 sm:mb-4">By 2027, we envision OriginForge as the <strong>LinkedIn for gamers and Stripe for game authentication</strong>. Our roadmap: 500+ games using our platform, millions of verified players, and $8M+ ARR. We&rsquo;re building the decentralized identity infrastructure that becomes the industry standard.</p>
                <p className="text-gray-800 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">Imagine a future where every major game uses OriginForge for secure authentication, and every serious gamer has their verified profile. <strong>One platform connecting the entire gaming ecosystem through trust and verifiable identity.</strong></p>
              </div>
            )}
            {activeSection === 'features' && (
              <div className="w-full text-center md:text-left description-section">
                <h2 className="font-press-start text-base sm:text-xl md:text-2xl lg:text-3xl text-yellow-700 mb-3 sm:mb-4" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>KEY FEATURES</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                  <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-2 sm:p-4"><h3 className="font-press-start text-xs sm:text-sm md:text-base lg:text-lg text-yellow-800 mb-1 sm:mb-2">OAuth for Games</h3><p className="text-gray-700 text-xs md:text-sm">DID-based authentication with SDKs for Unity, Unreal, and web games. <strong>Integrate in minutes, secure forever.</strong></p></div>
                  <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-2 sm:p-4"><h3 className="font-press-start text-xs sm:text-sm md:text-base lg:text-lg text-yellow-800 mb-1 sm:mb-2">Fraud Prevention API</h3><p className="text-gray-700 text-xs md:text-sm">AI-powered cheater detection, ban evasion tracking, and reputation scoring. <strong>Protect your players automatically.</strong></p></div>
                  <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-2 sm:p-4"><h3 className="font-press-start text-xs sm:text-sm md:text-base lg:text-lg text-yellow-800 mb-1 sm:mb-2">Premium Profiles</h3><p className="text-gray-700 text-xs md:text-sm">Verified gaming identity for tournaments and professional networking. <strong>Your credibility, proven.</strong></p></div>
                  <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-2 sm:p-4"><h3 className="font-press-start text-xs sm:text-sm md:text-base lg:text-lg text-yellow-800 mb-1 sm:mb-2">Analytics Dashboard</h3><p className="text-gray-700 text-xs md:text-sm">Player insights, retention metrics, and behavioral analytics for developers. <strong>Data that drives decisions.</strong></p></div>
                </div>
              </div>
            )}
            {activeSection === 'technology' && (
              <div className="w-full text-center md:text-left description-section">
                <h2 className="font-press-start text-base sm:text-xl md:text-2xl lg:text-3xl text-yellow-700 mb-3 sm:mb-4" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>TECHNOLOGY</h2>
                <p className="text-gray-800 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-3 sm:mb-4">Built on Polkadot substrate with Web3 Foundation backing, we deliver <strong>enterprise-grade infrastructure</strong> that scales. Our AI-enhanced fraud detection uses machine learning for reputation scoring, device fingerprinting, and cross-game correlation analysis to eliminate cheaters and protect legitimate players.</p>
                <p className="text-gray-800 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">Our architecture: Event ingestion APIs → Message queue → ML processing → Real-time risk assessment. <strong>99.9% uptime SLA with sub-100ms authentication response times.</strong> Built for the demanding performance requirements of modern gaming.</p>
              </div>
            )}
            {activeSection === 'join' && (
              <div className="w-full text-center description-section">
                <h2 className="font-press-start text-base sm:text-xl md:text-2xl lg:text-3xl text-yellow-700 mb-4 sm:mb-6" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>JOIN THE REVOLUTION</h2>
                <p className="text-gray-800 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">We&rsquo;re raising $1M to revolutionize gaming authentication. <strong>Join our journey:</strong> 50 studios in Year 1, scaling to 500+ by Year 3, building the infrastructure layer that powers the future of gaming. Game developers save $200K per project. Players get unified identity. Everyone wins.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <TakeSurveyButton
                    onClick={() => router.push('/survey')}
                    className="w-[160px] sm:w-[220px] md:w-[280px] lg:w-[320px]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile-only horizontal padding for description sections */}
      <style jsx>{`
        @media (max-width: 767px) {
          .description-section {
            padding-left: 16px;
            padding-right: 16px;
          }
        }

        @media (max-width: 480px) {
          .description-section {
            padding-left: 12px;
            padding-right: 12px;
          }
        }
      `}</style>
    </div>
  );
}
