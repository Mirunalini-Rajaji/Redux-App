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
            manufacturer: '',
            supplier: '',
            stock: '',
            rating: 0,
            image: ''
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
    getManufacturer = (event) => {
        this.setState({ manufacturer: event.target.value })
    }
    getSupplier = (event) => {
        this.setState({ supplier: event.target.value })
    }
    getStock = (event) => {
        this.setState({ stock: event.target.value })
    }
    getRating = (event) => {
        this.setState({ rating: event.target.value })
    }
    getImage = (event) => {
        this.setState({ image: event.target.value.substr(12) })
        // this.checkImage()
    }
    add = (e) => {
        e.preventDefault();
        let products = {

            name: this.state.name,
            image: this.state.image,
            price: this.state.price,
            quantity: this.state.quantity,
            category: this.state.category,
            manufacturer: this.state.manufacturer,
            supplier: this.state.supplier,
            stock: this.state.stock,
            rating: this.state.rating
        }
        console.log(products)
        Axios.post("http://localhost:3000/allProducts", products)
            .then(response => {
                console.log(response)
                this.props.setProducts(products)
                this.props.history.push('/')

            })

    }
    render() {
        return (
            <div>
                <form onSubmit={this.add}>

                    <center style={{ padding: '20px' }}>
                        <h2>Add Product</h2>
                        <input type="text" placeholder="Product Name" onChange={this.getName} required></input><br></br>
                        <input type="number" placeholder="Price" onChange={this.getPrice} required min='1'></input><br></br>
                        <input type="number" placeholder="Quantity" onChange={this.getQuantity} required min='1'></input><br></br>
                        <input type="text" placeholder="Manufacturer" onChange={this.getManufacturer} required></input><br></br>
                        <input type="text" placeholder="Supplier" onChange={this.getSupplier} required></input><br></br>

                        <select onChange={this.getCategory} id="category" required>
                            <option value="">Select Category</option>
                            <option value="Mobiles">Mobiles</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Dress">Dress</option>
                            <option value="Toys">Toys</option>
                        </select><br></br>
                        <select onChange={this.getStock} id="stock" required>
                            <option value="">Select Stock</option>
                            <option value="instock">Instock</option>
                            <option value="outofStock">Out Of stock</option>
                        </select><br></br>
                        <input type="number" placeholder="Ratings" onChange={this.getRating} required min='1' max='5'></input><br></br>
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