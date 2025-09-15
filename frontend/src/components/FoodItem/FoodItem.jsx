import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
const FoodItem = ({id,name, price , description,image}) => {
    // Earlier I was using different state for each foodItem and updating through their function . Not optimised one 
    // So , I used Context State to store the values of each food item at a particular place and accessing it from their and updation their defined function and each changes will reflect at all .  
  const {cartItems,addToCart,removeFromCart,url} =useContext(StoreContext);
    return (
    <div className='food-item' key={id}>
        <div className="food-item-img-container">
            <img src={`${url}/images/`+image+'.png'} alt="" className="food-item-image" />
            
            {!cartItems[id] ?
   <img className='add' onClick={()=>addToCart(id)}
             src={assets.add_icon_white}/>
             : <div className='food-item-counter'>
                <img onClick={()=> removeFromCart(id) } src={assets.remove_icon_red} alt="" />
                 <p>{cartItems[id]}</p>
                <img onClick={()=> addToCart(id) } src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className='food-item-price'>${price}</p>
        </div>
    </div>
  )
}
export default FoodItem
