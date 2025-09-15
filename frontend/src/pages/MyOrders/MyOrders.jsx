import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const [data, setData] = useState([]);
    const { url, token } = useContext(StoreContext);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            if(response.data.success){
                setData(response.data.data);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    useEffect(() => {
        if(token){
            fetchOrders();
        }
    }, [token]);

    if (data.length === 0) {
        return (
            <div className="verify">
                <div className="spinner"></div>
                <p className="fetching-message">Loading Your Orders</p>
            </div>
        );
    }

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {data.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    data.map((order, index) => (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="Parcel Icon" />
                            <p>
                                {order.items.map(item => `${item.name} x ${item.quantity}`).join(', ')}
                            </p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span> &#8226;</span> <b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MyOrders;
