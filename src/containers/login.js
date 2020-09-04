import React from 'react';
import {Link} from 'react-router-dom'
import Axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pwd:'',
            emailAddress:'',
            invaliderror:'',
            wrongerror:''
        }
    }
    
    getPwd = (event) => {
        this.setState({ pwd: event.target.value })
    }
    getEmail = (event) => {
        this.setState({ emailAddress: event.target.value })
    }
  
    login =  async() => {

        const data =  await Axios.get('http://localhost:4000/newuser?emailAddress=' + this.state.emailAddress);
        if (data.data.length !== 0) {
            if (this.state.pwd === data.data[0].pwd) {
                localStorage.setItem("loggedIn",true)
                this.props.history.push('/product')   
              
            } else {
                let wrongerror="* Wrong Password"
                this.setState({wrongError:wrongerror})

            }
            
        }
        else {
            let invaliderror="* Invalid User"
            this.setState({invalidError:invaliderror})
        }
    }
  
    render() {
       
        return (
           <div>
                <form >

                    <center style={{ padding: '20px' }}>
                        <h2>Login</h2>
                       
                        <input type="text" placeholder="Email Address" onChange={this.getEmail} required></input><br></br>
                        <input type="password" placeholder="Password" onChange={this.getPwd} required></input><br></br>
                        <div className="error">{this.state.wrongError}</div>
                        <div className="error">{this.state.invalidError}</div>
                        <button type="submit" onClick={this.login}>Login</button><br></br>
                        
                        <p >Dont have an account? <Link to="/signup" style={{ fontSize: "17px", color: " rgb(40, 2, 90)" }}>Create Account</Link></p>
                    </center>

                </form>

            </div>
        );
    }
}

export default Login;