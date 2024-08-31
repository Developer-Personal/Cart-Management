import React from 'react'
import { FaShoppingCart, FaSearch } from 'react-icons/fa';

const ShoppingCart = ({cart}) => {

  let quantity = 0
  cart.forEach(item => {
    quantity += item.quantity
  })
    
  return (
    <>
    <header>

    <div className='nav-bar'>
        <div className="brand">E-Commerce</div>
        <div className="search-bar">
            <input type="text" placeholder='Search Product...'/>
            <FaSearch className="search-icon" /> 
        </div>
        <div className="cart">
            <FaShoppingCart className="cart-icon" /> 
            <span className='cart-count'>{quantity}</span>
          </div>

    </div>
    </header>
    
    
    </>
  )
}


export default ShoppingCart