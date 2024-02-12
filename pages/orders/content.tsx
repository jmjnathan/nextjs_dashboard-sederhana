import { useEffect, useState} from 'react';
import { FaPrint } from 'react-icons/fa';
import axios from 'axios';
const Content = () => {
    const [orders, setOrders] = useState([]);

useEffect(()=>{
    const fetchData = async ()=>{
        try{
            const [cartsResponse, userResponse] = await Promise.all([
                axios.get('https://fakestoreapi.com/carts'),
                axios.get('https://fakestoreapi.com/users')
            ]);

            const carts = cartsResponse.data;
            const users = userResponse.data;

            const mergedData = carts.map(cart =>({
                ...cart,
                user: users.find(user=>user.id === cart.userId)
            }));

            setOrders(mergedData);
        }catch(error){
            console.error("eror coy")
        }
    };
    fetchData();
}, []);
    return (
        <div className='ml-[210px] p-5 w-10/12'>
            <div className='mt-1 flex justify-end text-[12px] mb-2 gap-2'>
                <h2 className='m-2'>Sort order by date from</h2>
                <input type="date" className="bg-gray-200 p-2 rounded-xl"></input>
                <h2 className='m-2'>to</h2>
                <input type="date" className="bg-gray-200 p-2 rounded-xl"></input>
                <button className="bg-blue-500 p-2 rounded text-white flex justify-center items-center gap-1 hover:bg-blue-600"><FaPrint/> Print</button>
            </div>

            <table className="justify-center items-center text-left min-w-full bg-white border border-gray-300 text-[12px]">
                <thead className="bg-slate-200 text-black">
                    <tr>
                        <th className="py-2 px-4 w-[100px]">Id Orders</th>
                        <th className="py-2 px-4 w-[150px]">Name</th>
                        <th className="py-2 px-4">Address</th>
                        <th className="py-2 px-4">Date</th>
                        <th className="py-2 px-4">Price</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="py-2 px-4">A000{order.id}</td>
                            <td className="py-2 px-4 capitalize">{order.user?.name?.firstname} {order.user?.name?.lastname || " "}</td>
                            <td className="py-2 px-4 capitalize">{order.user?.address?.street}, {order.user?.address?.city || " "}</td>
                            <td className="py-2 px-4">{order.date}</td>
                            <td className="py-2 px-4"></td>
                            <td className="py-2 px-4"></td>
                            <td className="py-2 px-4">
                                <button className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Detail</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Content;
