import { useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import axios from 'axios';

import Sidebar from '@/components/sidebar';

type Admin ={
    id: number;
    email: string;
    username: string;
    name:{
        firstname: string;
        lastname:string;
    };
    phone: number;
};
const Admins = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [admins, setAdmins] = useState<Admin[]>([]);
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

    useEffect(()=>{
        async function getAdmins(){
            try{
                const res = await axios.get ('https://fakestoreapi.com/users?limit=5');
                setAdmins(res.data);
            } catch (e){
                console.log('error:', e);
            }
            }
            getAdmins();
    }, []);

    return (
            <div className=''>  
                <Sidebar/>
                <div className='ml-[210px] p-5 mr-2 w-10/12'>
                    <div className='flex items-center justify-between'>
                        <h1 className='font-bold text-[24px]'>Admins</h1>
                        <button 
                            onClick= {handleLogout}
                            className='text-black text-sm md:text-base rounded p-2 pb-2 h-9 border-2 hover:bg-gray-200 flex items-center justify-center'
                        >Log Out</button>
                    </div>

                    <div className='flex justify-end items-end text-center my-5 gap-2'>
                        <button className='w-auto h-auto rounded text-[14px] text-black p-2  bg-slate-200 hover:bg-slate-400'>Sort</button>
                        <button className='w-auto h-auto rounded text-[14px] text-black p-2 bg-slate-200 hover:bg-slate-400'>Add Admin</button>
                    </div>
                    <div className='mt-5'>
                        <table className='min-w-full bg white border border-gray-300 text-[12px] font-montserrat'>
                            <thead className="bg-slate-200 text-black text-left">
                                <tr>
                                    <th className='py-2 px-4'></th>
                                    <th className='py-2 px-4'>Name</th>
                                    <th className='py-2 px-4'>Username</th>
                                    <th className='py-2 px-4'>Email</th>
                                    <th className='py-2 px-4'>Phone</th>
                                    <th className='py-2 px-4 text-center'>Action</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {admins.map((admin: Admin)=> (
                                        <tr key={admin.id} className='border-t p-5'>
                                            <td className='py-2 px-4'>
                                                <input type='checkbox'/>
                                            </td>
                                            <td className='py-2 px-4 capitalize'>{admin.name.firstname} {admin.name.lastname}</td>
                                            <td className='py-2 px-4'>{admin.username}</td>
                                            <td className='py-2 px-4'>{admin.email}</td>
                                            <td className='py-2 px-4'>{admin.phone}</td>
                                            <td className='py-2 px-4 flex gap-2 justify-center'>
                                                <button className='text-white bg-blue-500 hover:bg-blue-600 p-2 rounded'>
                                                    Detail
                                                </button>
                                                <button className='text-white bg-red-500 hover:bg-red-600 p-2 rounded'>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            
                        </table>
                    </div>
                </div>
            </div>
        );
    };  
    
export default Admins;
