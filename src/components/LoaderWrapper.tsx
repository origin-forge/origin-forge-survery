"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const PixelLogoLoader = dynamic(() => import("@/components/PixelLogoLoader"), { ssr: false });

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    function handleLoad() {
      setLoading(false);
    }
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
    }
    return () => window.removeEventListener("load", handleLoad);
  }, []);
  return (
    <>
      {loading && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#f7e8c3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.3s',
        }}>
          <PixelLogoLoader />
        </div>
      )}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.3s' }}>{!loading && children}</div>
    </>
  );
}