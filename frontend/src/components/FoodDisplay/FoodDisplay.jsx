import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';
const FoodDisplay = ({category}) => {
    const {food_list,url} = useContext(StoreContext);
  return (
    food_list.length === 0 ? (
                  <div className="verify">
                      <div className="spinner"></div>
                     <p className='fetching-message'>Fetching Menu for You </p> 
                  </div>

              ) :

    (<div className='food-display' id='food-display'>
        <h2>Top dishes near you </h2>
        <div className="food-display-list">
            {
            food_list.map((item, index)=>
            {   if(item.category === category || category ==="All"){
              // console.log(item._id+ "index is "+ index);
                   return  (<FoodItem key={index} id ={item._id} price={item.price} name={item.name} description={item.description} image={item.image}/>)
                }
                 }
                
            )}
        </div>

      
    </div>)
  )
}


export default FoodDisplay
