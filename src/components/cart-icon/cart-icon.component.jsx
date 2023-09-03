import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './cart-icon.styles.scss';

const CartIcon = () => {

    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen); //

    const cartNumber = (items) => {
        if(cartCount === 0) {
            return;
        } else if (cartCount > 9) {
            return '9+';
        }
        return cartCount;
    }

    const countOfCartItems = cartNumber(cartCount);

    return (
        <div className='cart-link' onClick={toggleIsCartOpen}>
            <p>CART</p>
            <span className='item-count'> {countOfCartItems} </span>

        </div>
    )
}

export default CartIcon;