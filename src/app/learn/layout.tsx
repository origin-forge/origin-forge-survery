import React from "react";
import RouteLoader from "@/components/RouteLoader";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteLoader>
      <div className="bg-[#f7e8c3] min-h-screen">
        {children}
      </div>
    </RouteLoader>
  );
}
