import { useContext, Fragment } from 'react';
import {useParams} from 'react-router-dom'; //In the upper level shop.component file, we use ":categories" to pass a paramter for the path, this is how we do it.

import ProductCard from '../../components/product-card/product-card.component';

import { CategoriesContext } from '../../contexts/categories.context';

import './category.styles.scss'

//Refer to Navigation bar -> Shop related files. 
//Related to categories.preview.

const Category = () => {
    const {category} = useParams();

    const {categoriesMap} = useContext(CategoriesContext);

    const products = categoriesMap[category];

    return(

    <Fragment>
        <h1 className='title'>{category.toUpperCase()}</h1>
        <div className='category-container'>

        
            { products && 
                products.map((product) => <ProductCard key={product.id} product={product}/>)
            }
        
        </div>
    </Fragment>
    );

}

export default Category;