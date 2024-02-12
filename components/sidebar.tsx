import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { FaTachometerAlt, FaBox, FaSignOutAlt, FaShoppingCart, FaUsers, FaUser } from 'react-icons/fa';

const Sidebar =() => {
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
        <div className='font-montserrat w-1/6 h-screen bg-slate-800 justify-center items-center p-5 fixed shadow-lg'>
            <div className='flex items-center justify-center mb-5 shadow-md text-center'>
                <h1 className='mb-5 text-[32px] text-slate-100'>   Logo</h1>
            </div>
            <div className='flex flex-col gap-2 text-[14px] justify-center font-medium text-slate-100'>
                <a href="./dashboard"
                    className=' flex p-2 hover:text-blue-500 items-center text-center'>
                    <FaTachometerAlt className='mr-2'/> 
                    Dashboard
                </a>
                <a href="./products"
                    className='flex p-2 hover:text-blue-500 items-center text-center'>
                    <FaBox className='mr-2'/>
                    Products
                </a>
                <a href="./orders"
                    className='flex p-2 hover:text-blue-500 items-center text-center'>
                    <FaShoppingCart className='mr-2'/>
                    Orders
                </a>
                <a href="./customers"
                    className='flex p-2 hover:text-blue-500 items-center text-center'>                    
                    <FaUsers className='mr-2'/>
                    Customers List
                </a>
                <a href='./admins'
                    className='flex p-2 hover:text-blue-500 items-center text-center'>
                    <FaUser className='mr-2'/>
                    Admin List
                </a>
            </div>
            <div className='translate-y-40'>
                <button
                    onClick={handleLogout}
                    className='flex p-2  mt-2 text-slate-100 hover:text-blue-500 items-center text-center text-[14px] font-semibold'>
                    <FaSignOutAlt className='mr-2'/>
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;