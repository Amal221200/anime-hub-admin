'use client';
import { Next13ProgressBar } from 'next13-progressbar';
import { Suspense } from 'react';

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Suspense>
                <Next13ProgressBar height="2px" color="#eeeeee" options={{ showSpinner: false }} showOnShallow />
            </Suspense>
            {children}
        </>
    );
};

export default ProgressProvider;