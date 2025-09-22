import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const DesktopHero: React.FC = () => {
  const router = useRouter();
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-8 py-12" style={{backgroundImage: 'url(/bg.svg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
      {/* Logo in top-left corner */}
      <div className="absolute top-0 left-0 z-20 p-4">
        <button
          aria-label="Go to Home"
          onClick={() => router.push('/')}
          style={{ background: 'none', border: 'none', boxShadow: 'none', padding: 0, cursor: 'pointer' }}
        >
          <Image src="/logo.svg" alt="OriginForge Logo" width={80} height={80} className="w-20 h-20 object-contain cursor-pointer" priority />
        </button>
      </div>
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
        <Image src="/signup.png" alt="Sign Up" width={220} height={80} className="mb-8 mx-auto" />
        <h1 className="font-press-start text-3xl sm:text-5xl text-yellow-300 mb-6 drop-shadow-lg">OriginForge</h1>
        <p className="text-lg sm:text-xl text-yellow-100 mb-8 max-w-xl mx-auto">Unify your gaming achievements across all platforms. Join the revolution!</p>
        <button
          className="pixel-button bg-yellow-400 text-yellow-900 px-10 py-4 rounded shadow text-xl font-bold border-2 border-yellow-600"
          onClick={() => router.push('/survey')}
        >
          Take the Survey
        </button>
      </div>
    </section>
  );
};

export default DesktopHero;
