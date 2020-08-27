import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Product from './containers/product';
import AddProduct from './containers/addProduct';
import EditProduct from './containers/editProduct'
import signUp from './containers/signUp';
import Login from './containers/login';
import Dashboard from './containers/dashboard';

class Router extends React.Component {
    state = {  }
    render() { 
        return (
            <div>
                 <Switch>
                    <Route exact path='/' component={Login}></Route>
                    <Route  path='/signup' component={signUp}></Route>
                    <Route  path='/product' component={Product}></Route>
                    <Route path="/addproduct" component={AddProduct}></Route>
                    <Route path="/editproduct" component={EditProduct}></Route>
                    <Route path="/dashboard" component={Dashboard}></Route>
                </Switch>
            </div>
          );
    }
}
 
export default Router;