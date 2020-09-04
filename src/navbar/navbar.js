import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import '../css/style.css'

class Navbar extends React.Component {
    logOut = (e) => {
        e.preventDefault()
        localStorage.removeItem('loggedIn');
        this.props.history.push('/')
    }
    render() {
        const userReg = (
            <div className="header">
                <Link to="#" className="logo" onClick={this.logOut.bind(this)}>Inventory</Link>
                <div className="header-right">
                    <Link to='/dashboard'>DashBoard</Link>
                    <Link to="/product">Products</Link>
                    <Link to="/addProduct" >AddProducts</Link>
                </div>
            </div>
        )
        const userlink = (
            <div className="header">
                <Link to="#" className="logo">Inventory</Link>
            </div>
        )
        return (
            <div>
                {localStorage.loggedIn ? userReg : userlink}
            </div>
        )
    }
}

export default withRouter(Navbar);