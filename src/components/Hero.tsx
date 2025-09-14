

import Image from 'next/image';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import "../app/press-start-font.css";


const Hero: React.FC = () => {
    const textRef = useRef<HTMLDivElement>(null);
    const [showSurvey, setShowSurvey] = useState(false);
    const SurveySlider = dynamic(() => import('./SurveySlider'), { ssr: false });



    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#f7e8c3] via-[#f7cc1f]/30 to-[#281a25]/80">
            {/* Background SVG pattern */}
            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src="/bg.svg"
                    alt="Background pattern"
                    fill
                    className="object-cover"
                    quality={100}
                />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pt-16 pb-8 px-2 sm:px-4 md:px-8">
                {/* Title and subtitle */}
                <div className="w-full flex justify-center mb-2 sm:mb-4">
                    <div
                        ref={textRef}
                        className="font-press-start flex flex-col justify-center items-center w-full max-w-5xl mx-auto mt-4 sm:mt-8 select-none"
                    >
                        <span
                            className="block whitespace-nowrap text-white text-[7vw] sm:text-[5vw] md:text-[4vw] lg:text-[3.5vw] xl:text-[3vw] font-bold text-center tracking-[0.04em] leading-[1.1] drop-shadow-2xl"
                            style={{
                                WebkitTextStroke: '2px #000',
                                textShadow: '2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 2px 0 0 #000, -2px 0 0 #000',
                                marginTop: '-1.2em',
                                marginBottom: '0.2em',
                            }}
                        >
                            FORGE YOUR ULTIMATE
                        </span>
                        <span
                            className="block text-yellow-400 text-[6vw] sm:text-[4.7vw] md:text-[4vw] lg:text-[3.7vw] xl:text-[3vw] font-bold text-center tracking-[0.13em] leading-[1.05] drop-shadow-2xl"
                            style={{
                                WebkitTextStroke: '2px #000',
                                textShadow: '2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 2px 0 0 #000, -2px 0 0 #000',
                                marginTop: '0.1em',
                            }}
                        >
                            GAMING LEGACY
                        </span>
                        <div
                            className="mt-4 sm:mt-6 text-base xs:text-lg md:text-xl lg:text-2xl text-black text-center whitespace-normal px-2 sm:px-0"
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                letterSpacing: '0.01em',
                            }}
                        >
                            Craft decentralized identities, own achievements, build a verifiable profile.
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-row flex-wrap gap-3 sm:gap-4 justify-center mb-6 sm:mb-10 w-full max-w-2xl
                    md:flex-col md:items-center md:space-y-4 md:space-x-0
                    ">
                    <button
                        className="hero-btn min-w-[140px] max-w-xs sm:max-w-none bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#281A25] font-bold shadow-lg pixel-border hover:from-yellow-500 hover:to-yellow-700 transition md:w-full"
                        onClick={() => setShowSurvey(true)}
                    >
                        Take Survey
                    </button>
                    <a href="#" className="hero-btn min-w-[140px] max-w-xs sm:max-w-none bg-white text-[#B37B0D] font-bold shadow-lg pixel-border hover:bg-yellow-50 transition md:w-full">
                        Learn More
                    </a>
                </div>
                {showSurvey && (
                    <SurveySlider onClose={() => setShowSurvey(false)} />
                )}

                {/* Platform Icons */}
                <div className="relative flex justify-center items-center mt-2 sm:mt-4 h-24 sm:h-32 md:h-36 w-full">
                    {/* ps.svg responsive */}
                    <div
                        style={{
                            position: 'absolute',
                            left: 'clamp(0.5vw, 2vw, 3vw)',
                            top: 'clamp(-22vw, -13vw, -7vw)',
                            width: 'clamp(40px, 13vw, 120px)',
                            height: 'clamp(40px, 13vw, 120px)',
                            transform: 'rotate(-32deg) scale(1.10)',
                            opacity: 0.98,
                            zIndex: 5,
                        }}
                    >
                        <Image
                            src="/ps.svg"
                            alt="PlayStation"
                            width={0}
                            height={0}
                            style={{ width: '100%', height: '100%' }}
                            sizes="(max-width: 600px) 40px, (max-width: 900px) 90px, 120px"
                        />
                    </div>
                    {/* steam.svg responsive */}
                    <div
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '40%',
                            width: 'clamp(32px, 8vw, 85px)',
                            height: 'clamp(32px, 8vw, 88px)',
                            transform: 'translateX(-50%) rotate(4.49deg)',
                            opacity: 1,
                            zIndex: 4,
                        }}
                    >
                        <Image
                            src="/steam.svg"
                            alt="Steam"
                            width={0}
                            height={0}
                            style={{ width: '100%', height: '100%' }}
                            sizes="(max-width: 600px) 32px, (max-width: 900px) 60px, 85px"
                        />
                    </div>
                    {/* xbox.svg responsive */}
                    <div
                        style={{
                            position: 'absolute',
                            right: 'clamp(2vw, 12%, 16vw)',
                            top: 'clamp(4vw, 10%, 16vw)',
                            width: 'clamp(40px, 13vw, 120px)',
                            height: 'clamp(40px, 13vw, 120px)',
                            transform: 'rotate(-7deg) scale(1.10)',
                            zIndex: 1,
                        }}
                    >
                        <Image
                            src="/xbox.svg"
                            alt="Xbox"
                            width={0}
                            height={0}
                            style={{ width: '100%', height: '100%' }}
                            sizes="(max-width: 600px) 40px, (max-width: 900px) 90px, 120px"
                        />
                    </div>
                </div>
            </div>
    </section>
    );
};

export default Hero;