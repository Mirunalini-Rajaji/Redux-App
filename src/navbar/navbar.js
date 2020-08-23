import React from 'react';
import {Link} from 'react-router-dom'
import '../css/style.css'
class Navbar extends React.Component {
    state = {  }
    render() { 
        return ( 
            <div className="header">
                <a href="/" className="logo">Inventory</a>
                <div className="header-right">
                <Link to="/addProduct" >AddProducts</Link>
                <Link to="/">Products</Link>
               
                </div>
                {/* <ul>
                <li >
                        <Link to="/addProduct" style={{ textDecoration: 'none' }}>AddProducts</Link>
                    </li>
                    <li >
                        <Link to="/" style={{ textDecoration: 'none' }}>Products</Link>
                    </li>
                    {/* <li >
                        <Link to="/editproduct" style={{ textDecoration: 'none' }}>Edit Product</Link>
                    </li> */}
                {/* </ul>  */}
            </div>
         );
    }
}
 
export default Navbar;