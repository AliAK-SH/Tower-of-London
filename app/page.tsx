// app/page.tsx
"use client";

import { useEffect, useState } from 'react';
import Home from '../components/Home';
import InfoPage from '../components/InfoPage';
import TestTemplate from '../components/TestTemplate';
import { VARIANT_DATA_TEST } from '../lib/variants';

export default function App() {
  const [params, setParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    const updateParams = () => setParams(new URLSearchParams(window.location.search));
    updateParams();
    window.addEventListener('popstate', updateParams);
    return () => window.removeEventListener('popstate', updateParams);
  }, []);

  if (!params) return <div className="bg-[#07172d] min-h-screen" />;

  const step = params.get('step');
  const variantId = params.get('variant') || "fimbel-young";

  if (!step || step === 'landing') return <Home />;
  if (step === 'info') return <InfoPage />;
  if (step === 'test') return <TestTemplate variantId={variantId} />;

  return <Home />;
}
