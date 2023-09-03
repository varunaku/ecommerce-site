import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';


import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

const App = () => {
 

  return (
  <Routes>
    <Route path='/' element ={<Navigation />} >
      <Route index element={<Home />} /> 
      <Route path='shop/*' /*          The '/*' here represents that there will be other routes within shop that can have any name. The routing itself is handled in shop.component.          */  element={<Shop /> } /> 
      <Route path='auth' element={<Authentication />} />
      <Route path='checkout' element={<Checkout/>} /> 
      
    </Route>
     
  </Routes>
  

  );//Index here just means that it is the same path as what it is nested under. 
  //Routes enables us to use Route. the / (base route) here is just default and refers to the home page. 
  //When path value url matches the string, it will render said element.
  //When we put <Routes> in around something, it just means that we are expecting routing.
  //the path is just the extension on the url, and the element is what is rendered. In order to make the link work, you have to use <Link /> in the nav bar component and set a to='...'
} 


//Navigation in our app is first implemented as the top level file for the page that is to be rendered and put in the routes folder first.
//We then import Routes and useRoute from react-router-dom, and put in each page as a route and set a url path, and import the page from the routes folder as a component, and set that as the destination page (aka element as seen above).

export default App;
//Comment