import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import axios from 'axios';

import Sidebar from '@/components/sidebar';
import AddProduct from './addProduct';
import Detail from './detailModal';

type Product = {
    id: number;
    title: string;
    category: string;
    price: number;
    description: string;
    image: string;
    };

    const Products = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [updateProducts, setUpdateProducts] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        queryClient.clear();
        router.push('/login');
    };

    const handleProductUpdate = () => {
        setUpdateProducts((prev) => !prev);
        };

    useEffect(() => {
        const isAuthenticated = !!localStorage.getItem('token');

        if (!isAuthenticated) {
        router.push('/login');
        }

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

    useEffect(() => {
        async function getProducts() {
        try {
            const res = await axios.get('https://fakestoreapi.com/products');
            setProducts(res.data);
        } catch (e) {
            console.log('error: ', e);
        }
        }
        getProducts();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            };
        
            fetchProducts();
        }, []);
    

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const openModal = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    const handleDetailClick = (product: Product) => {
        openModal(product);
    };



    return (
        <div className=''>
        <Sidebar />
        <div className='ml-[210px] p-5 mr-2 w-10/12'>
            <div className='flex items-center justify-between'>
            <h1 className='font-bold text-[24px]'>Products</h1>
            <button
                onClick={handleLogout}
                className='text-black text-sm md:text-base rounded p-2 pb-2 h-9 border-2 hover:bg-gray-200 flex items-center justify-center'
            >
                Log Out
            </button>
            </div>

            <AddProduct/>

            <div className='flex justify-end items-end text-center my-5 gap-2'>
                        <button className='w-auto h-auto rounded text-[14px] text-black p-2  bg-slate-200 hover:bg-slate-400'>Sort</button>
                        <button className='w-auto h-auto rounded text-[14px] text-black p-2 bg-slate-200 hover:bg-slate-400'>Add Product</button>
            </div>

            <div className='mt-5'>
            <table className='min-w-full bg-white border border-gray-300 text-[12px] font-montserrat'>
                <thead className='bg-slate-200 text-black text-left'>
                <tr className=''>
                    <th className='py-2 px-4 w-[50px]'> </th>
                    <th className='py-2 px-4 w-[400px]'>Product</th>
                    <th className='py-2 px-4 w-[150px]'>Category</th>
                    <th className='py-2 px-4 w-[100px]'>Price</th>
                    <th className='py-2 px-4'>Picture</th>
                    <th className='py-2 px-4'>Sold</th>
                    <th className='py-2 px-4'>Action</th>
                </tr>
                </thead>
                <tbody>
                {currentProducts.map((product) => (
                    <tr key={product.id} className='border-t p-5'>
                    <td className='py-2 px-4'>
                        <input type='checkbox' />
                    </td>
                    <td className='py-2 px-4'>{product.title}</td>
                    <td className='py-2 px-4 capitalize'>{product.category}</td>
                    <td className='py-2 px-4'>$ {product.price}</td>
                    <td className='py-2 px-4'>
                        <div className='w-12 h-12 border-2 rounded justify-center'>
                        <img
                            src={product.image}
                            alt={product.title}
                            className='h-11 object-cover items-center m-auto py-1'
                        />
                        </div>
                    </td>
                    <td className='py-2 px-4'>null qty</td>
                    <td>
                        <button
                        className='bg-green-500 text-white p-2 rounded-md hover:bg-green-600'
                        onClick={() => handleDetailClick(product)}
                        >
                        Detail Product
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
                
            </table>
            {isModalOpen && selectedProduct && (
                <Detail
                    // product={selectedProduct}
                    // closeModal={closeModal}
                />
            )}
            </div>
            <div className='mt-2 flex justify-end items-center'>
                <ul className='flex space-x-2 bg-slate-100 p-1 rounded-md'>
                    {currentPage > 1 && (
                        <li 
                        className={`cursor-pointer ${currentPage === 1 ? 'bg-gray-300' : 'bg-slate-300'} border-2 h-auto w-6 text-center justify-center rounded-md`}
                        onClick={() => paginate(currentPage - 1)}
                        >
                        {'<'}
                        </li>
                    )}
                    {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
                        <li
                        key={index}
                        className={`cursor-pointer ${currentPage === index + 1 ? 'font-bold' : ''}`}
                        onClick={() => paginate(index + 1)}
                        >
                        {index + 1}
                        </li>
                    ))}
                    {currentPage < Math.ceil(products.length / productsPerPage) && (
                        <li 
                        className={`cursor-pointer ${currentPage === Math.ceil(products.length / productsPerPage) ? 'bg-gray-300' : 'bg-slate-300'} border-2 h-auto w-6 text-center justify-center rounded-md`}
                        onClick={() => paginate(currentPage + 1)}
                        >
                        {'>'}
                        </li>
                    )}
                    </ul>

            </div>
        <h2>Product List</h2>
        <ul>
            {products.map((product) => (
            <li key={product.id}>
                {product.title} - ${product.price}
            </li>
            ))}
        </ul>
        </div>


        </div>
    );
};

export default Products;
