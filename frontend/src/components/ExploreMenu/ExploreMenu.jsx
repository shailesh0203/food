import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div>
      <div className="explore-menu" id='explore-menu'>
        <h1>Explore Our Menu</h1>
        <p className="explore-menu-text"> Choose from a diverse menu.</p>
        <div className='explore-menu-list'>
            {menu_list.map((value,index)=>{
                return (
                       <div onClick={()=> setCategory((prev)=> prev=== value.menu_name? "All": value.menu_name) 

                    } key={index} className='explore-menu-list-item'>
                        <img className={category === value.menu_name?"active":""} src={value.menu_image} alt="" /> 
                        <p>{value.menu_name}</p>
                    </div>
                )
            }

            )}
            
        </div>
        <hr />
      </div>
    </div>
  )
}

export default ExploreMenu
