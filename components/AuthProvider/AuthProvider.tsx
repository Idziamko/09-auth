'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      setLoading(true);
      try {
        const session = await checkSession();
        if (session && session.success) {
          const user = await getMe();
          setUser(user);
        } else {
          clearIsAuthenticated();
          if (pathname.startsWith('/profile') || pathname.startsWith('/notes')) {
            router.push('/sign-in');
          }
        }
      } catch (error) {
        clearIsAuthenticated();
        if (pathname.startsWith('/profile') || pathname.startsWith('/notes')) {
          router.push('/sign-in');
        }
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [pathname, setUser, clearIsAuthenticated, router]);

  if (loading && (pathname.startsWith('/profile') || pathname.startsWith('/notes'))) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
