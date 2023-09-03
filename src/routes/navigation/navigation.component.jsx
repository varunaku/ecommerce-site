//NAV BAR

import { Fragment, useContext } from "react"; //for when you want to render nothing and group a list of children
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg' //basically here we name it crwnlogo and bring in the logo through this, and it will show instead of text. we call it with <Crwnlogo />
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import './navigation.styles.scss'

const Navigation = () => {
  const {currentUser} = useContext(UserContext); //based on this value we display a sing out opr sign in link

  const { isCartOpen } = useContext(CartContext); //For the cart dropdown


  // const signOutHandler = async () => {
  //   await signOutUser();
  //   setCurrentUser(null);
  // }

  //const {currentUser} = useContext(UserContext); //re renders. from user context jsx


    return (
      <Fragment> 
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <CrwnLogo className="logo"/>
            </Link>
          
          <div className="nav-links-container">
            <Link className="nav-link" to='/shop'>
                SHOP
                </Link>
              
            { // when there is a current user, we want to render a different link; one that says SIGN OUT. If no current user, we render sign out instead
              currentUser ? (
                <span className="nav-link" onClick={signOutUser}> SIGN OUT </span>
                ) : (
                <Link className="nav-link" to='/auth'>
                SIGN IN
                </Link>
              )
            }
            
            <CartIcon />
            </div>
            
         {isCartOpen && <CartDropdown />}  
        </div> 
        <Outlet/>  
      </Fragment> //If both cart open and cart drop down is true, it returns the 2nd element, which is cart drop down
    ) //outlet is how parent routes render child routes. So here, home and shop are child routes and will swap, with navigation bar ALWAYS on the page. 
    //First Div represents whole bar
    //link is for links in routing to different pages
  } 

  export default Navigation;