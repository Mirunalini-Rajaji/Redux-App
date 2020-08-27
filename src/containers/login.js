import React from 'react';
import {Link} from 'react-router-dom'
import Axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password:'',
            email:''
        }
    }
    
    getPwd = (event) => {
        this.setState({ password: event.target.value })
    }
    getEmail = (event) => {
        this.setState({ email: event.target.value })
    }
  
    login =  async() => {

        const data =  await Axios.get('http://localhost:3000/users?email=' + this.state.email);
        if (data.data.length !== 0) {
            if (this.state.password === data.data[0].password) {
                this.props.history.push('/product')   
              
            } else {
                alert("Wrong Password")

            }
            
        }
        else {
            alert("invalid user")
        }
    }
  
    render() {
       
        return (
            <div>
                 <div className="header">

                 <Link to="/" className="logo">Inventory</Link>
            </div>
                <form >

                    <center style={{ padding: '20px' }}>
                        <h2>Login</h2>
                       
                        <input type="text" placeholder="Email Address" onChange={this.getEmail} required></input><br></br>
                        <input type="password" placeholder="Password" onChange={this.getPwd} required></input><br></br>
                       

                        <button type="submit" onClick={this.login}>Login</button><br></br>
                        
                        <p >Dont have an account? <Link to="/signup" style={{ fontSize: "17px", color: " rgb(40, 2, 90)" }}>Create Account</Link></p>
                    </center>

                </form>

            </div>
        );
    }
}

export default Login;