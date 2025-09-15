import React from "react";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#f7e8c3] min-h-screen">
        {children}
      </body>
    </html>
  );
}
