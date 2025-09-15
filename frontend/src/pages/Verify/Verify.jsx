import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios'
const Verify = () => {
  const [searchParams , setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const {url} = useContext(StoreContext);
  const verifyPayment = async ()=>{
    const response = await axios.post(url+'/api/order/verify' , {success , orderId });
    console.log("response aaya kuch")
    if(response.data.success){
      console.log("verified ")
      navigate('/myorders');
    }
    else{
      navigate('/');
      console.log("kuch error hai ");
    }
  }
  useEffect(()=>{
    verifyPayment();
  },[])
  console.log(success+orderId)
  return (
    <div className='verify'>
      <div className="spinner"></div>
      
    </div>
  )
}
export default Verify
