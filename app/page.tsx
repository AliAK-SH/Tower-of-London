"use client";

import { useEffect, useState } from 'react';
import Home from '../components/Home';
import InfoPage from '../components/InfoPage';

// We define the registry here so the App knows which titles to pass/handle if needed
export const VARIANT_DATA = {
  "unconstrained-prog": { title: "تست بدون محدودیت (صعودی)" },
  "unconstrained-rand": { title: "تست بدون محدودیت (تصادفی)" },
  "shallice-classic": { title: "آزمون شالیس (کلاسیک)" },
  "shallice-random": { title: "آزمون شالیس (تصادفی)" },
  "phillips-a": { title: "آزمون فیلیپس - سری A" },
  "phillips-b": { title: "آزمون فیلیپس - سری B" },
  "phillips-c": { title: "آزمون فیلیپس - سری C" },
  "fimbel-old": { title: "آزمون فیمبل (سالمندان)" },
  "fimbel-young": { title: "آزمون فیمبل (جوانان)" },
  "tol-r": { title: "آزمون TOL-R" },
  "tol-dx": { title: "آزمون TOL-DX" },
};

const PlaceholderTest = ({ variant }: { variant: string | null }) => (
  <div className="min-h-screen bg-[#020b18] text-white flex flex-col items-center justify-center">
    <h1 className="text-2xl font-bold">
      در حال بارگذاری: {variant ? VARIANT_DATA[variant as keyof typeof VARIANT_DATA]?.title : "آزمون"}
    </h1>
    <p className="mt-4 text-gray-400">محیط اجرای آزمون (TestContainer) در گام بعدی پیاده‌سازی می‌شود...</p>
    <a href="/" className="mt-8 text-blue-400 hover:text-blue-300 transition-colors">
      بازگشت به صفحه اصلی
    </a>
  </div>
);

export default function App() {
  const [params, setParams] = useState<URLSearchParams | null>(null);

  // Sync state with URL
  useEffect(() => {
    const handleSearchParams = () => {
      setParams(new URLSearchParams(window.location.search));
    };

    handleSearchParams();
    
    // Listen for popstate (back/forward button) to keep UI in sync
    window.addEventListener('popstate', handleSearchParams);
    return () => window.removeEventListener('popstate', handleSearchParams);
  }, []);

  if (!params) return <div className="bg-[#020b18] min-h-screen" />;

  const step = params.get('step');
  const variant = params.get('variant');

  // 1. Landing Page (Home)
  if (!step || step === 'landing') {
    return <Home />;
  }

  // 2. Information & Instruction Page
  if (step === 'info') {
    return <InfoPage />;
  }

  // 3. The Actual Test Environment
  if (step === 'test') {
    return <PlaceholderTest variant={variant} />;
  }

  // Fallback to Home
  return <Home />;
}
