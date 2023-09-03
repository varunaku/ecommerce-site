import { createContext, useEffect, useState } from 'react';

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (existingCartItem.quantity > 1) {
    return cartItems.map((cartItem) =>
      (cartItem.id === productToRemove.id)
        ? { ...cartItem, quantity: cartItem.quantity - 1 } //if the id matches, give us a the same object but with the quantity reduced by 1
        : cartItem
    );
  }

  return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);

};

export const clearCartItem = (cartItems, productToClear) => 
  cartItems.filter(cartItem => cartItem.id !== productToClear.id);



export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [cartCount, setCartCount] = useState(0); 
  const [cartTotal, setCartTotal] = useState(0); 

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount); //Total is our accumulator, which we set to 0 above. As it iterates through each element (an object called cartItem in the cartItems array), it will add the quantity to the total.
  }  , [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    setCartTotal(newCartTotal); //Total is our accumulator, which we set to 0 above. As it iterates through each element (an object called cartItem in the cartItems array), it will add the quantity to the total.
  }  , [cartItems]);

  const addItemToCart = (product) =>
    setCartItems(addCartItem(cartItems, product));

  const removeItemFromCart = (product) =>
   setCartItems(removeCartItem(cartItems, product));

   const clearItemFromCart = (product) =>
   setCartItems(clearCartItem(cartItems, product)); 

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, clearItemFromCart, cartTotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};