import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import './placeorder.css'
import { toast,ToastContainer } from 'react-toastify';
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);
  const navigate = useNavigate();
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    zipcode:"",
    country:"",
    phone:"",
  });
  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}));
  }
  const placeOrder= async(event)=>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item ;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);

      }
    });
    console.log(orderItems);
    let orderData ={
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()+2,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers: {token}});
    if(response.data.success){
      console.log("Redirecting to stripe link for payment ");
      const {session_url} = response.data;


      window.location.replace(session_url);
    }
    // alert(response.data.message);
    else{
      console.log("Some error occured");
      toast.error("Please sign in");
      // alert(response.data.message);
    }
    useEffect(()=>{
      if(!token){
        navigate('/cart')
      }
      else if (getTotalCartAmount()=== 0){
        
        toast.error('Cart Empty. Please add something.')
        navigate('/cart');

      }
    },[token]);

  }
  return (

    <div>
        <form action="" onSubmit={placeOrder} className='place-order'>
          <div className="place-order-left">
            <p className="title">
              Delivery Information
            </p>
            <div className="multi-fields">
              <input required type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First Name' />
              <input required type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last Name' />
            </div>
            <input required name='email' type="email" onChange={onChangeHandler} value={data.email} placeholder='email address' />
            <input required type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' />
            <div className="multi-fields">
              <input required type="text " name='city' onChange={onChangeHandler} value={data.city}  placeholder='city' />
              <input required type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='state'/>

            </div>
            <div className="multi-fields">
              <input required type="text " name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' />
              <input required type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country'/>
            </div>
            <input required type="text" name='phone' onChange={onChangeHandler} value={data.phone}placeholder='Phone' />

          </div>
          <div className="place-order-right">
          <div className="cart-total">
          <h2>Cart totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>

          </div>
          <hr />
          <div className="cart-total-details">
            <p>De livery Fee</p>
            <p>{2}</p>
          </div>
          <hr />

          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount()=== 0 ? 0:getTotalCartAmount()+2}</b>
          </div>
        <button type='submit' >Proceed to Payment</button>
        </div>
          </div>
        </form>
    </div>
  )
}
export default PlaceOrder;
