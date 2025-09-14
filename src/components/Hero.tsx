

import Image from 'next/image';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import "../app/press-start-font.css";


const Hero: React.FC = () => {
    const textRef = useRef<HTMLDivElement>(null);
    const [showSurvey, setShowSurvey] = useState(false);
    const SurveySlider = dynamic(() => import('./SurveySlider'), { ssr: false });



    return (
        <section
            className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#f7e8c3] via-[#f7cc1f]/30 to-[#281a25]/80"
        >
            {/* Background SVG pattern */}
            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src="/bg.svg"
                    alt="Background pattern"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pt-24 pb-16 px-4 sm:px-8">
                {/* Title and subtitle */}
                <div className="w-full flex justify-center mb-4">
                    <div
                        ref={textRef}
                        className="font-press-start flex flex-col justify-center items-center w-full max-w-5xl mx-auto mt-8 select-none"
                    >
                        <span
                            className="block whitespace-nowrap text-white text-[5vw] md:text-[4vw] lg:text-[3.5vw] xl:text-[3vw] font-bold text-center tracking-[0.04em] leading-[1.1] drop-shadow-2xl"
                            style={{
                                WebkitTextStroke: '2px #000',
                                textShadow: '2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 2px 0 0 #000, -2px 0 0 #000',
                                marginTop: '-1.5em',
                                marginBottom: '0.2em',
                            }}
                        >
                            FORGE YOUR ULTIMATE
                        </span>
                        <span
                            className="block text-yellow-400 text-[4.7vw] md:text-[4vw] lg:text-[3.7vw] xl:text-[3vw] font-bold text-center tracking-[0.13em] leading-[1.05] drop-shadow-2xl"
                            style={{
                                WebkitTextStroke: '2px #000',
                                textShadow: '2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 2px 0 0 #000, -2px 0 0 #000',
                                marginTop: '0.1em',
                            }}
                        >
                            GAMING LEGACY
                        </span>
                        <div
                            className="mt-6 text-lg md:text-xl lg:text-2xl text-black text-center whitespace-nowrap"
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
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                    <button
                        className="hero-btn bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#281A25] font-bold shadow-lg pixel-border hover:from-yellow-500 hover:to-yellow-700 transition"
                        onClick={() => setShowSurvey(true)}
                    >
                        Take Survey
                    </button>
                    <a href="#" className="hero-btn bg-white text-[#B37B0D] font-bold shadow-lg pixel-border hover:bg-yellow-50 transition">
                        Learn More
                    </a>
                </div>
                {showSurvey && (
                    <SurveySlider onClose={() => setShowSurvey(false)} />
                )}

                {/* Platform Icons */}
                <div className="relative flex justify-center items-center mt-4 h-32 sm:h-36 w-full">
                    <div
                        style={{
                            position: 'absolute',
                            top: '2px', // move to vertical middle of text
                            left: '10%',
                            width: '160px',
                            height: '130px',
                            transform: 'rotate(-20deg)',
                            opacity: 1,
                            zIndex: 2,
                        }}
                    >
                        <Image
                            src="/ps.svg"
                            alt="PlayStation"
                            width={160}
                            height={10}
                        />
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            left: '408px',
                            top: '40px',
                            width: '85.00000231340347px',
                            height: '88.00000239505302px',
                            transform: 'rotate(4.49deg)',
                            opacity: 1,
                            zIndex: 4,
                        }}
                    >
                        <Image
                            src="/steam.svg"
                            alt="Steam"
                            width={85.00000231340347}
                            height={88.00000239505302}
                        />
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            right: '12%',
                            top: '20%',
                            transform: 'rotate(-7deg) scale(1.32)',
                            zIndex: 1,
                        }}
                    >
                        <Image
                            src="/xbox.svg"
                            alt="Xbox"
                            width={110}
                            height={90}
                        />
                    </div>
                </div>
            </div>
    </section>
    );
};

export default Hero;