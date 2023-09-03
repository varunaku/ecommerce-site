import './cart-item.styles.scss';

const CartItem = ({cartItem}) => {

    const {name, quantity, price, imageUrl} = cartItem; //both name and quantity passed down.

    return(
        <div className='cart-item-container'>

            <img src={imageUrl} alt={'${name}'} />
            <div className='item-details'>
            <span className='name'> {name} </span>
                <span className='price'>
                   x{quantity} (${quantity * price})
                </span>
            </div>
        </div>
    )

}

export default CartItem;