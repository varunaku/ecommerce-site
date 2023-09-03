//highest level for our checkout page.


//To make a new page we first build the highest level in routes
//Then we import it into App.js and fix our routing.
//Then we go to wherever the button that will open this page exists (cart-dropdown-component) and in this case we use the useNavigate (hook) from react router dom because this page is not on our navigation bar. 
//We make a handler for navigation and put it into the button onClick. 


import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';


import './checkout.styles.scss'

const Checkout = () => {

    const {cartItems, cartTotal} = useContext(CartContext);


    return (
        <div className='checkout-container'>
            <div className='checkout-header'>

                <div className='header-block'>
                    <span>Product</span>
                </div>

                <div className='header-block'>
                    <span>Description</span>
                </div>

                <div className='header-block'>
                    <span> Quantity</span>
                </div>

                <div className='header-block'>
                    <span>Price</span>
                </div>

                <div className='header-block'>
                    <span>Remove</span>
                </div>
            
            
            </div>

            {   cartItems.map((cartItem) => (
                 (<CheckoutItem key={cartItem.id} cartItem={cartItem} />) //passing down cartItem as a prop
            ))}


            <span className='total'>Total: ${cartTotal} </span>
    
        </div>
    );
};


export default Checkout;