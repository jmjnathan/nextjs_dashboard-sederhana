import React, { useState } from 'react';

interface Product {
    id: number;
    title: string;
    category: string;
    price: number;
    description: string;
    image: string;
}

const DetailModal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [editData, setEditData] = useState<Product | {}>({});

    const openModal = (product: Product) => {
        setSelectedProduct(product);
        setEditData({ ...product });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setEditData({});
        setIsModalOpen(false);
    };
    return (
        <div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={closeModal}>
                    <div className="bg-white p-6 rounded-md h-auto w-[650px] items-center">
                        <h2 className="text-[18px] font-bold mb-4 text-center font-poppins">Product Details</h2>

                        <hr className="my-4 border-t border-blue-300" />

                        <table className="justify-start items-start text-[14px]">
                            <tr className="text-left">
                                <td className="py-2 px-4">Title</td>
                                <td>:</td>
                                <td className="py-2 px-4 font-bold">{selectedProduct?.title}</td>
                            </tr>
                            <tr className="text-left">
                                <td className="py-2 px-4">Price</td>
                                <td>:</td>
                                <td className="py-2 px-4">$ {selectedProduct?.price}</td>
                            </tr>
                            <tr className="text-left">
                                <td className="py-2 px-4">Category</td>
                                <td>:</td>
                                <td className="py-2 px-4 capitalize">{selectedProduct?.category}</td>
                            </tr>
                            <tr className="text-left">
                                <td className="py-2 px-4">Description</td>
                                <td>:</td>
                                <td className="py-2 px-4">{selectedProduct?.description}</td>
                            </tr>
                            <tr className="text-left">
                                <td className="py-2 px-4">Pict</td>
                                <td>:</td>
                                <td className="py-2 px-4 capitalize">
                                    <img
                                        // src={selectedProduct.image}
                                        // alt={selectedProduct.title}
                                        className="object-cover h-20"
                                    />
                                </td>
                            </tr>
                        </table>

                        <hr className="my-4 border-t border-blue-300" />

                        <div className="justify-center flex gap-2 text-[14px] mt-5">
                            <button className="bg-blue-500 w-[100px] text-white p-2 rounded-md">
                                Edit
                            </button>

                            <button onClick={closeModal} className="bg-red-500 w-[100px] text-white p-2 rounded-md">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailModal;