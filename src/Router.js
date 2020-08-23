import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Product from './containers/product';
import AddProduct from './containers/addProduct';
import EditProduct from './containers/editProduct'

class Router extends React.Component {
    state = {  }
    render() { 
        return (
            <div>
                 <Switch>
                   
                   
                    <Route exact path='/' component={Product}></Route>
                    <Route path="/addproduct" component={AddProduct}></Route>
                    <Route path="/editproduct" component={EditProduct}></Route>
                   
                </Switch>
            </div>
          );
    }
}
 
export default Router;