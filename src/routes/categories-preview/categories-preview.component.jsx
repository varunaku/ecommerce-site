import { useContext, Fragment } from "react";

import { CategoriesContext } from "../../contexts/categories.context";

import CategoryPreview from "../../components/category-preview/category-preview.component";

import './categories-preview.styles.scss';

//Prior to the routing done in the upper level, this just shows what appears when you click on each individual category of clothing, like for example mens, or womens (all in the shopping page).
//It will render an entire single category.

//related to product.context.jsx

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);
  
    return (
      <Fragment>
        {Object.keys(categoriesMap).map((title) => {
            const products = categoriesMap[title];
            return (<CategoryPreview key={title} title={title} products={products} />
        )}
            
        )}
      </Fragment>
    );
  };
  
  export default CategoriesPreview;