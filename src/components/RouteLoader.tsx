"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
const PixelLogoLoader = dynamic(() => import("@/components/PixelLogoLoader"), { ssr: false });

export default function RouteLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const handle = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(handle);
  }, [pathname]);

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
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.3s' }}>{children}</div>
    </>
  );
}
