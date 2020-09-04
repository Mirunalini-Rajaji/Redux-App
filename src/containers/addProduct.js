import React from 'react';
import addProductBroadCast from '../actions/addProductBroadCast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Axios from 'axios';


class AddProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            name: '',
            price: 0,
            quantity: 0,
            category: '',
           
           
           
            image: '',
            producterror:''
        }
    }
    getName = (event) => {
        this.setState({ name: event.target.value })
    }
    getPrice = (event) => {
        this.setState({ price: event.target.value })
    }
    getQuantity = (event) => {
        this.setState({ quantity: event.target.value })
    }
    getCategory = (event) => {
        this.setState({ category: event.target.value })
    }
   
   
    
    getImage = (event) => {
        this.setState({ image: event.target.value.substr(12) })
        // this.checkImage()
    }
    add = async(e) => {
        e.preventDefault();
        let products = {

            name: this.state.name,
            image: this.state.image,
            price: this.state.price,
            quantity: this.state.quantity,
            category: this.state.category,
            
            
           
        }
        console.log(products)
        const data = await Axios.get('http://localhost:3000/allProducts?name=' + this.state.name);
        
        if (data.data.length !== 0) {
           
            if (this.state.name.toLocaleLowerCase() === data.data[0].name.toLocaleLowerCase()) {
                // alert("product is already added")
                let producterror="* Product already added"
                this.setState({productError:producterror})
            }
        } else
        Axios.post("http://localhost:3000/allProducts", products)
            .then(response => {
                console.log(response)
                this.props.setProducts(products)
                this.props.history.push('/product')

            })

    }
    render() {
        return (
            <div>
               
                <form onSubmit={this.add}>

                    <center style={{ padding: '20px' }}>
                        <h2>Add Product</h2>
                        <div className="error">{this.state.productError}</div>
                        <input type="text" placeholder="Product Name" onChange={this.getName} required></input><br></br>
                        <input type="number" placeholder="Price" onChange={this.getPrice} required min='1'></input><br></br>
                        <input type="number" placeholder="Quantity" onChange={this.getQuantity} required min='1'></input><br></br>
                       
                        <select onChange={this.getCategory} id="category" required>
                            <option value="">Select Category</option>
                            <option value="Mobiles">Mobiles</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Dress">Dress</option>
                            <option value="Toys">Toys</option>
                        </select><br></br>
                        
                        <input type="file" onChange={this.getImage} required multiple accept='image/*'></input><br></br>
                        <button type="submit">Add</button>
                    </center>

                </form>

            </div>
        );
    }
}
function actionDispatch(dispatch) {
    console.log("dispatch")
    return bindActionCreators({
        setProducts: addProductBroadCast
    }, dispatch)
}

export default connect(null, actionDispatch)(AddProduct);