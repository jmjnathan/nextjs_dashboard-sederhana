import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { FaShoppingBag, FaList, FaShoppingBasket, FaTruck, FaMoneyBill, FaUser } from 'react-icons/fa';

const Ringkasan = () => {
    const [products, setProducts]= useState([]);
        const [category, setCategory]= useState([]);
    
        useEffect(()=>{
            async function fetchData(){
                try{
                    const productResponse = await axios.get('https://fakestoreapi.com/products');
                    const categoriesResponse = await axios.get('https://fakestoreapi.com/products/categories');

                    setProducts(productResponse.data);
                    setCategory(categoriesResponse.data);
                }catch (error){
                    console.error('error. maap ya')
                }
            }

            fetchData();
        }, []);



    return (
        <div className='flex gap-8 mt-5 font-montserrat'>
            <div className='border rounded-xl w-[150px] bg-slate-50 text-gray-800 p-2'>
                <div className='flex items-center justify-center gap-2'>
                    <FaShoppingBag className='w-[14px]'/>
                    <h1 className='font-semibold'>Product</h1>
                </div>
                <div className='grid rounded-xl'>
                    <h2 className='font-semibold text-[28px] text-center'>{products.length}</h2>
                </div>
            </div>

            <div className='border rounded-xl w-[150px] bg-slate-50 text-gray-800 p-2'>
                <div className='flex items-center justify-center gap-2'>
                    <FaList className='w-[14px]'/>
                    <h1 className='font-semibold'>Categories</h1>
                </div>
                <div className='grid rounded-xl'>
                    <h2 className='font-semibold text-[28px] text-center'>{category.length}</h2>
                </div>
            </div>

            <div className='border rounded-xl w-[150px] bg-slate-50 text-gray-800 p-2'>
                <div className='flex items-center justify-center gap-2'>
                    <FaShoppingBasket className='w-[14px]'/>
                    <h1 className='font-semibold'>Purchases</h1>
                </div>
                <div className='grid rounded-xl'>
                    <h2 className='font-semibold text-[28px] text-center'>789744</h2>
                </div>
            </div>

            <div className='border rounded-xl w-[150px] bg-slate-50 text-gray-800 p-2'>
                <div className='flex items-center justify-center gap-2'>
                    <FaTruck className='w-[14px]'/>
                    <h1 className='font-semibold'>Shipping</h1>
                </div>
                <div className='grid rounded-xl'>
                    <h2 className='font-semibold text-[28px] text-center'>51276</h2>
                </div>
            </div>

            <div className='border rounded-xl w-[150px] bg-slate-50 text-gray-800 p-2'>
                <div className='flex items-center justify-center gap-2'>
                    <FaMoneyBill className='w-[14px]'/>
                    <h1 className='font-semibold'>Income</h1>
                </div>
                <div className='grid rounded-xl'>
                    <h2 className='font-semibold text-[28px] text-center'>{products.length}</h2>
                </div>
            </div>

            <div className='border rounded-xl w-[150px] bg-slate-50 text-gray-800 p-2'>
                <div className='flex items-center justify-center gap-2'>
                    <FaUser className='w-[14px]'/>
                    <h1 className='font-semibold'>Admin</h1>
                </div>
                <div className='grid rounded-xl'>
                    <h2 className='font-semibold text-[28px] text-center'>5</h2>
                </div>
            </div>
            
        </div>
    );
};

export default Ringkasan;