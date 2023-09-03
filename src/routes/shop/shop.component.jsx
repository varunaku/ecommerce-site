import { Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component'

import './shop.styles.scss';


//THIS IS WHAT YOU SEE WHEN YOU CLICK SHOP ON THE NAVIGATION BAR
//HIGHEST LEVEL PAGE FOR /SHOP ONCE YOU CLICK ON IT

//related to product.context.jsx

const Shop = () => {


  
    return (
        
        <Routes>
            <Route index element={<CategoriesPreview />}/>
            <Route path=":category" /* <- is a parameter */ element={<Category />}/>
        
        </Routes>
    );
  };
  
  export default Shop;