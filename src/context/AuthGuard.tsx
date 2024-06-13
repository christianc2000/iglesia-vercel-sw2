
"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Loader from '@/components/common/Loader';
import { useRouter } from 'next/navigation'

export function AuthGuard({ children }: React.PropsWithChildren) {
    const { user } = useAuth();
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
        if (isClient && !user) {
            router.push('/auth/signin');
            console.log('Usuario no autenticado. Redirigiendo a la página de inicio de sesión.');
        }
    }, [isClient, user]);

    if (!isClient || !user) {
        return <Loader />;
    }

    return <>{children}</>;
};

export default AuthGuard;
