import { Link } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';

import './category-preview.styles.scss';

//Lowest level in its chain, this will simply make sure to render 4 items in each category when you click on shop.

const CategoryPreview = ({ title, products }) => (
  <div className='category-preview-container'>
    <h2>
      <Link className='title' to={title}>{title.toUpperCase()}</Link> 
    </h2>
    <div className='preview'>
      {products
        .filter((_, index) => index < 4)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  </div>
);

export default CategoryPreview;

