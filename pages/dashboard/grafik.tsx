import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Grafik = () => {
    const [salesData, setSalesData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize selectedDate state with the current date
    const [productData, setProductData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await axios.get('https://fakestoreapi.com/products?limit=5');
            const newSalesData = response.data.map((product) => ({
            name: product.title,
            sales: Math.floor(Math.random() * 100) + 1,
            }));
            setSalesData(newSalesData);
            const productDistribution = response.data.reduce((acc, product) => {
                const existingProduct = acc.find(item => item.name === product.category);

                if (existingProduct) {
                    existingProduct.value += 1;
                } else {
                    acc.push({ name: product.category, value: 1 });
                }

                return acc;
            }, []);
            
            setProductData(productDistribution);
            setTotalPages(parseInt(response.headers['x-total-pages'], 10));

        } catch (error) {
            console.error("error co", error);
        }
        }

        fetchData();
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date)
    };
    const colorScale = ['#927EEE', '#7D62F6', '#3002FF', '#6442FF', '#2500CC'];


    return (
        <div className='justify font-montserrat'>
            <div className='flex justify-between'>
                <div className="justify-center">
                    <h2 className="m-5 font-semibold underline">Sales Data</h2>
                        <LineChart width={550} height={300} data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="sales" stroke="blue" />
                        </LineChart>
                </div>
                <div className="mt-10 ml-5">
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        />
                </div>
            </div>

            <div className="flex gap-6 mt-5">
                <div className="justify-center">
                        <h2 className="m-5 font-semibold underline">Product Distribution</h2>
                        <PieChart width={450} height={400}>
                            <Pie dataKey="value" data={productData} cx="50%" cy="50%" outerRadius={120} label>
                                {
                                    productData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colorScale[index % colorScale.length]} />
                                    ))
                                }
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                </div>
            </div>
        </div>
    );
};

export default Grafik;