// pages/Dashboard.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';

import Sidebar from '@/components/sidebar';
import Grafik from './grafik';
import Ringkasan from './ringkasan';

const Dashboard = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleLogout = () => {
        localStorage.removeItem('token');
        queryClient.clear();
        router.push('/login');
    };

    useEffect(() => {
        const isAuthenticated = !!localStorage.getItem('token');

        if (!isAuthenticated) {
        router.push('/login');
        }
        // Ini gunanya untuk pengguna tidak dapat mengakses halaman lainnya setelah logout
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        const isBackButtonClicked = event.type === 'beforeunload';
        if (isBackButtonClicked) {
            setTimeout(() => {
            router.push('/login');
            }, 0);
        }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [router, queryClient]);

    return (
            <div className=''>  
                <Sidebar/>
                <div className='ml-[210px] p-5 mr-2 w-10/12'>
                    <div className='flex items-center justify-between'>
                        <h1 className='font-bold text-[24px]'>Dashboard</h1>
                        <button
                        onClick={handleLogout}
                        className='text-black text-sm md:text-base rounded p-2 pb-2 h-9 border-2 hover:bg-gray-200 flex items-center justify-center'
                        >
                        Log Out
                        </button>

                    </div>
                    <div className='mt-5'>
                        <div>
                            <Ringkasan/>    
                            <Grafik/>
                        </div>
                    </div>
                </div>
            </div>
        );
    };  
    
export default Dashboard;
