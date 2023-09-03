import { Link } from 'react-router-dom';
import './directory-item.styles.scss';

const DirectoryItem = ({category}) => {

    const {imageUrl, title} = category;

    return (
        <div className='directory-item-container'>
          <div className='background-image' style={{
            backgroundImage: `url(${imageUrl})` }} />
          <div className='body'>
            <h2>{title}</h2>
            <Link to={"/shop/"+title.toLowerCase()}> Click to Shop Now</Link>
          </div>
        </div>
    )

}
//lower level than directory component. Takes the categories array in directly as props, and uses image url and title.
//This will be called 5 times because there are 5 objects in the array (5 pics in main page)
export default DirectoryItem;