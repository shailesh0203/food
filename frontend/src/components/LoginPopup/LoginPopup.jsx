import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import axios from 'axios';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const LoginPopup= ( {setShowLogin} )=> {
    const {url,setToken}= useContext(StoreContext);
    const [currState , setCurrState ]= useState('Login'); 
    const [data,setData] = useState({
        name: "",
        email:'',
        password: '',
    })
    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]: value }));
    }
    
    const onLogin = async (event)=>{
        event.preventDefault();
        console.log('login');
        let newUrl = url;
        if(currState=== "Login" ){
            newUrl += '/api/user/login';
        }
        else{
            newUrl += '/api/user/register';
        }
        console.log(data);
        // const formData = new FormData();
        // formData.append('name' ,"data.name");
        // formData.append('email' ,"data.email");
        // formData.append('password' ,"data.password");
        const response = await axios.post(newUrl , data );
        if(response.data.success){
            console.log("done")
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        }
        else{
            alert(response.data.message);
        }


    }

    return (
    <div className='login-popup'>
        <form action="" className='login-popup-container' onSubmit={onLogin}>
            <div className='login-popup-title'>
                <h2> {currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}/> 
            </div>
            {currState === 'Login'?<p>Create a new account? <span onClick={()=> setCurrState('Sign Up')}> Click here </span></p>:<p>Already have an account? <span onClick={()=> setCurrState('Login')}>Login Here</span></p>}
            <div className="login-popup-inputs">
                { currState=== 'Login'? <></> :          <input type="text"
                name='name' onChange={onChangeHandler} placeholder='Your Name ' required />}
                
                <input type="email" name='email' onChange={onChangeHandler} placeholder='Your email ' required />
                <input type="password" name='password' onChange={onChangeHandler} placeholder='Your password ' required />
            </div>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing , i agree to the terms of use and privacy policy </p>

            </div>
            <button type='submit'>{currState==='Sign Up'? "create account" : "signin"}</button>
            
            
            
        </form>
      
    </div>
  )
}

export default LoginPopup
