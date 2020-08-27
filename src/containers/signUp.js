import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Axios from 'axios';
import addUserBroadCast from '../actions/addUserBroadCast';

class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName:'',
            password:'',
            email:'',
            Fnameerror:'',
            Lnameerror:'',
            emailerror:'',
            pwderror:'',
            success:false,
        }
    }
    getFName = (event) => {
       let value=event.target.value
        value = value.replace(/[^A-Za-z]/ig, '')
        this.setState({ firstName:value  })
        this.checkFname()
    }
    getLName = (event) => {
        let value=event.target.value
        value = value.replace(/[^A-Za-z]/ig, '')
        this.setState({ lastName: value })
        this.checkLname()
    }
    getPwd = (event) => {
        this.setState({ password: event.target.value })
        this.checkPwd()
    }
    getEmail = (event) => {
        this.setState({ email: event.target.value })
        this.checkEmail()
    }
    checkFname = () => {
        let nameerror = ''
        if (this.state.firstName.length <= 3) {
            nameerror = "* Name must be an alphabet and greater than 4"
            this.setState({ fNameError: nameerror })
        }
        else {
            this.setState({ fNameError: '' })
        }
    }
    checkLname = () => {
        let lnameerror = ''
        if (this.state.lastName.length <= 3) {
            lnameerror = "* Name must be an alphabet and greater than 4"
            this.setState({ lNameError: lnameerror })
        }
        else {
            this.setState({ lNameError: '' })
        }
    }
    checkEmail = () => {
        let emailerror = ''
        if (this.state.email.length <= 3) {
            emailerror = "* Email must be abc@example.com"
            this.setState({ emailError: emailerror })
        }
        else {
            this.setState({ emailError: '' })
        }
    }
    checkPwd = () => {
        let pwderror = ''
        if (this.state.password.length <= 4) {
            pwderror = "* Password must have one  number and one uppercase and lowercase letter, and greater than 5 character"
            this.setState({ pwdError: pwderror })
        }
        else {
            this.setState({ pwdError: '' })
        }
    }
  
    signUp = (e) => {
        e.preventDefault();
        let user = {

            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            email: this.state.email
            
        }
      if(this.state.fNameError===''&& this.state.lNameError===''&&this.state.emailError===''&&this.state.pwdError===''){
        Axios.post("http://localhost:3000/users", user)
            .then(response => {
                console.log(response)
                this.props.setUser(user)
                this.setState({success:true})
                

            })
      }
    }
    continue=()=>{
        this.props.history.push('/')
    }
    render() {
        if(this.state.success){
            return (
                <div>
                <div className="header">
                    <Link to="/" className="logo">Inventory</Link> </div>
                    <div style={{ textAlign: 'center', paddingTop: '50px'}}>
                        <h3>Account Created Successfully!!</h3>
                        <h4>Click continue to Login</h4>
                        <button type="submit" onClick={this.continue}>Continue</button>
                    </div>
                    </div>
            )
        }
        return (
            <div>
                 <div className="header">

                    <Link to="/" className="logo">Inventory</Link>
                </div>
                <form onSubmit={this.signUp}>

                    <center style={{ padding: '20px' }}>
                        <h2>SignUp</h2>
                        <input type="text" placeholder="First Name" onChange={this.getFName} required></input>
                        <div>{this.state.fNameError}</div>
                        <input type="text" placeholder="Last Name" onChange={this.getLName} required></input>
                        <div>{this.state.lNameError}</div>
                        <input type="text" placeholder="Email Address" onChange={this.getEmail} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required></input><br></br>
                        <div>{this.state.emailError}</div>
                        <input type="password" placeholder="Password" onChange={this.getPwd} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required></input><br></br>
                        <div>{this.state.pwdError}</div>

                        <button type="submit" className="logo">SignUp</button>
                    </center>

                </form>

            </div>
        );
    }
}
function actionDispatch(dispatch) {
    console.log("dispatch")
    return bindActionCreators({
        setUser: addUserBroadCast
    }, dispatch)
}

export default connect(null, actionDispatch)(SignUp);