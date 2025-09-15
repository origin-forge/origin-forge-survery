import Image from 'next/image';

export default function PixelLogoLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f7e8c3] transition-opacity duration-300">
      <div className="pixel-loader p-4 rounded-lg border-4 border-yellow-400 shadow-xl bg-white/90">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20">
          <Image
            src="/logo.svg"
            alt="OriginForge Logo Loader"
            fill
            className="object-contain pixelate"
            priority
          />
        </div>
      </div>
      <style jsx>{`
        .pixel-loader {
          box-shadow: 0 0 0 4px #b37b0d, 0 0 0 8px #fffbe6;
        }
        .pixelate {
          image-rendering: pixelated;
          filter: contrast(1.2) brightness(0.98) drop-shadow(0 0 0 #b37b0d);
        }
      `}</style>
    </div>
  );
}
