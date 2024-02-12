import {useState} from 'react';
import axios from 'axios';

const addProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleAddProduct = async () => {
        try {
        const response = await axios.post('https://fakestoreapi.com/products', {
            title: productName,
            price: parseFloat(price),
            description,
        });

        console.log('Product added:', response.data);
        // Tambahkan logika lain jika diperlukan, seperti memperbarui state produk di komponen utama.
        } catch (error) {
        console.error('Error adding product:', error);
        }
    };
    return (
        <div>
        <h2>Add Product</h2>
        <form>
            <label>
            Product Name:
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </label>
            <br />
            <label>
            Price:
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>
            <br />
            <label>
            Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <br />
            <button type="button" onClick={handleAddProduct}>
            Add Product
            </button>
        </form>
        </div>
    );
};

export default addProduct;