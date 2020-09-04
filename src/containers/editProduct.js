import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import updateProductBroadCast from '../actions/updateProductBroadCast'
import Axios from 'axios';


class EditProduct extends React.Component {
    constructor(props) {
        super(props)

        this.state = {


            status: '',
            nameerror: '',
            buttonStatus: true,
            updateerror: ''

        }
    }

    componentWillMount() {
        let productToUpdate = this.props.allProducts.find((p) => {
            return p.id === this.props.history.location.state;
        });
        this.setState({
            id: productToUpdate.id,
            name: productToUpdate.name,
            image: productToUpdate.image,
            price: productToUpdate.price,
            quantity: productToUpdate.quantity,
            category: productToUpdate.category,




        });
    }



    getName = (event) => {
        this.setState({ name: event.target.value, buttonStatus: false })
        this.checkName()
    }
    getPrice = (event) => {
        this.setState({ price: event.target.value, buttonStatus: false })

    }
    getImage = (event) => {
        this.setState({ image: event.target.value.substr(12), buttonStatus: false })
    }
    getQuantity = (event) => {
        this.setState({ quantity: event.target.value, buttonStatus: false })

    }
    getCategory = (event) => {
        this.setState({ category: event.target.value, buttonStatus: false })
    }




    checkName = () => {
        let nameerror = ''

        if (this.state.name.length < 2) {
            nameerror = "* Name must be greater than 2"
            this.setState({ nameError: nameerror, buttonStatus: true })
        } else {
            this.setState({ nameError: "", buttonStatus: false })
        }
    }

    editProduct = async (e) => {
        e.preventDefault();
        let productRequest = {
            id: this.state.id,
            image: this.state.image,
            name: this.state.name,
            price: this.state.price,
            quantity: this.state.quantity,
            category: this.state.category,




        }
        const data = await Axios.get('http://localhost:3000/allProducts?id=' + this.state.id);

        if (data.data.length !== 0) {

            if (this.state.name === data.data[0].name && this.state.price === data.data[0].price
                && this.state.quantity === data.data[0].quantity && this.state.category === data.data[0].category
                && this.state.image === data.data[0].image) {

                this.setState({ buttonStatus: true })

            }

        }
        if (this.state.buttonStatus === false) {
            Axios.put("http://localhost:3000/allProducts/" + this.state.id, productRequest)
                .then(response => {
                    console.log(response)
                    this.props.setEditProducts(productRequest)
                    this.props.history.push('/product')
                })
        }

    }
    goBack = () => {
        this.props.history.push('/product')
    }
    render() {
        if (this.props.history.location.state === undefined) {
            return (
                <div>

                    <center>
                        <h3>Product Not Available!!</h3><br></br>
                        <button type="submit" onClick={this.goBack}>Go Back</button>
                    </center>
                </div>
            )
        }
        return (
            <div >

                <form onSubmit={this.editProduct}>

                    <center style={{ padding: '20px' }}>
                        <h2>Update Product</h2>
                        <div className="updateRow">
                            <div className="col-25">
                                <label >Product Name </label>
                            </div>
                            <div className="col-75">
                                <input type="text" value={this.state.name} onChange={this.getName} required style={{ width: '70%' }}></input>
                            </div>
                        </div>
                        <div className="error">{this.state.updateError}</div>
                        <div className="label">
                            <div className="col-25">
                                <label >Price </label>
                            </div>
                            <div className="col-75">
                                <input type="number" value={this.state.price} onChange={this.getPrice} required min="1" style={{ width: '70%' }}  ></input>
                            </div>
                        </div>
                        <div className="label">
                            <div className="col-25">
                                <label >Quantity </label>
                            </div>
                            <div className="col-75">
                                <input type="number" value={this.state.quantity} onChange={this.getQuantity} required min="1" style={{ width: '70%' }} ></input>
                            </div>
                        </div>
                        <div className="label">
                            <div className="col-25">
                                <label >Category </label>
                            </div>
                            <div className="col-75">
                                <select defaultValue={this.state.category} onChange={this.getCategory} id="category" style={{ width: '70%' }} required>
                                    <option value="">Select Category</option>
                                    <option value="Mobiles">Mobiles</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Dress">Dress</option>
                                    <option value="Toys">Toys</option>
                                </select>
                            </div>
                        </div>



                        <div className="label">
                            <div className="col-25">
                                <label >Image </label>
                            </div>
                            <div className="col-75">
                                <input type="file" onChange={this.getImage} multiple accept='image/*'></input>
                            </div>
                        </div>



                        <button type="submit" disabled={this.state.buttonStatus}>Update</button><br></br>
                    </center>

                </form>

            </div>
        );
    }
}
function actionDispatch(dispatch) {
    console.log("dispatch")
    return bindActionCreators({
        setEditProducts: updateProductBroadCast
    }, dispatch)
}
function convertToStore(store) {
    return {
        allProducts: store.allProducts
    }
}

export default connect(convertToStore, actionDispatch)(EditProduct);