'use client';

import { SignIn } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

function ColdSignInPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const origin = searchParams?.get('origin');
    if (origin) localStorage.setItem('origin', origin);
  }, [searchParams]);

  return <SignIn />;
}

export default ColdSignInPage;
