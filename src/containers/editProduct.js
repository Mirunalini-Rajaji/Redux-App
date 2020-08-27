import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import updateProductBroadCast from '../actions/updateProductBroadCast'
import Axios from 'axios';
import Navbar from '../navbar/navbar';

class EditProduct extends React.Component {
    constructor(props) {
        super(props)
       
        this.state = {
            
       
            status: '',
            nameerror: '',
           buttonStatus:false

        }
    }

componentWillMount(){
    let productToUpdate = this.props.allProducts.find((p) => {
        return p.id === this.props.history.location.state;
    });
        this.setState({
            id: productToUpdate.id,
            name: productToUpdate.name,
            image:productToUpdate.image,
            price: productToUpdate.price,
            quantity: productToUpdate.quantity,
            category: productToUpdate.category,
            manufacturer:productToUpdate.manufacturer,
            supplier:productToUpdate.supplier,
            stock:productToUpdate.stock,
            rating:productToUpdate.rating
          
          });
        }
   // componentWillMount() {
    //     if (this.props.location.state !== undefined) {
    //         Axios.get("http://localhost:3000/allProducts/" + this.props.location.state.myid).then(response => {
    //             console.log(response)
    //             this.setState({
    //                 id: response.data.id,
    //                 image: response.data.image,
    //                 name: response.data.name,
    //                 price: response.data.price,
    //                 quantity: response.data.quantity,
    //                 category: response.data.category,

    //             })
    //         }, error => {
    //             console.log(error)
    //         })
    //     }
    // }


    getName = (event) => {
        this.setState({ name: event.target.value })
        this.checkName()
    }
    getPrice = (event) => {
        this.setState({ price: event.target.value })

    }
    getImage=(event)=>{
        this.setState({image:event.target.value.substr(12)})
    }
    getQuantity = (event) => {
        this.setState({ quantity: event.target.value })

    }
    getCategory = (event) => {
        this.setState({ category: event.target.value })
    }
    getManufacturer=(event)=>{
        this.setState({manufacturer:event.target.value})
    }
    getSupplier=(event)=>{
        this.setState({supplier:event.target.value})
    }
    getStock=(event)=>{
        this.setState({stock:event.target.value})
    }
    getRating=(event)=>{
        this.setState({rating:event.target.value})
    }

    checkName = () => {
        let nameerror = ''
       
        if (this.state.name.length < 2) {
            nameerror = "* Name must be greater than 2"
            this.setState({ nameError: nameerror ,buttonStatus:true})
        } else {
            this.setState({ nameError: "" ,buttonStatus:false})
        }
    }

     editProduct = (e) => {
        e.preventDefault();
        let productRequest = {
            id: this.state.id,
            image:this.state.image,
            name: this.state.name,
            price: this.state.price,
            quantity: this.state.quantity,
            category: this.state.category,
            manufacturer:this.state.manufacturer,
            supplier:this.state.supplier,
            stock:this.state.stock,
            rating:this.state.rating

        }
        Axios.put("http://localhost:3000/allProducts/" + this.state.id, productRequest)
        .then(response => {
            console.log(response)
            this.props.setEditProducts(productRequest)
            this.props.history.push('/product')
        })
       
        
       
      

        // Axios.put("http://localhost:3000/allProducts/" + this.state.id, productRequest)
        //     .then(response => {
        //         console.log(response)
        //         this.props.history.push('/products')
        //     }, error => {
        //         console.log(error)
        //     })
            

        


    }
    goBack = () => {
        this.props.history.push('/product')
    }
    render() {
        if (this.props.history.location.state === undefined) {
            return (
                <div>
                    <Navbar></Navbar>
                    <center>
                        <h3>Product Not Available!!</h3><br></br>
                        <button type="submit" onClick={this.goBack}>Go Back</button>
                    </center>
                </div>
            )
        }
        return (
            <div >
              <Navbar></Navbar>
                <form onSubmit={this.editProduct}>
                   
                        <center style={{ padding: '20px' }}>
                            <h2>Update Product</h2>

                            <label >Product Name </label>
                            <input type="text" value={this.state.name} onChange={this.getName} required style={{ marginLeft: '3px' }}></input>
                            <div>{this.state.nameError}</div>
                            <label >Price </label>
                            <input type="number" value={this.state.price} onChange={this.getPrice} required min="1" style={{ marginLeft: '57px' }}  ></input>
                            <br></br>
                            <label >Quantity </label>
                            <input type="number" value={this.state.quantity} onChange={this.getQuantity} required min="1" style={{ marginLeft: '38px' }}  ></input>
                            <br></br>
                            <label >Category </label>
                            {/* <input type="text" value={this.state.category} onChange={this.getCategory} readOnly style={{ marginLeft: '42px' }} ></input> */}
                            <select defaultValue={this.state.category} onChange={this.getCategory} id="category" style={{ marginLeft: '38px' }} required>
                            <option value="">Select Category</option>
                            <option value="Mobiles">Mobiles</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Dress">Dress</option>
                            <option value="Toys">Toys</option>
                        </select>
                            <br></br>
                            <label >Manufacturer </label>
                            <input type="text" value={this.state.manufacturer} onChange={this.getManufacturer}  style={{ marginLeft: '5px' }} required ></input>
                            <br></br>
                            <label >Supplier </label>
                            <input type="text" value={this.state.supplier} onChange={this.getSupplier}  style={{ marginLeft: '40px' }} required ></input>
                            <br></br>
                            <label >Stock </label>
                            {/* <input type="text" value={this.state.stock} onChange={this.getStock}  style={{ marginLeft: '42px' }} ></input> */}
                            <select defaultValue={this.state.stock} onChange={this.getStock} id="stock" style={{ marginLeft: '47px' }} required>
                            <option value="">Select Stock</option>
                            <option value="Instock">Instock</option>
                            <option value="Out Of stock">Out Of stock</option>
                        </select>
                            <br></br>
                            <label >Ratings </label>
                            <input type="number" value={this.state.rating} onChange={this.getRating}  style={{ marginLeft: '38px' }}  min='1' max='5' required></input>
                            <br></br>
                            <label>Image</label>
                            <input type="file" onChange={this.getImage} style={{ marginLeft: '47px' }} multiple accept='image/*'></input><br></br>
                            <button type="submit" disabled={this.state.buttonStatus}>Update</button><br></br>
                        </center>
                   
                </form>

            </div>
        );
    }
}
function actionDispatch(dispatch){
    console.log("dispatch")
    return bindActionCreators({
        setEditProducts:updateProductBroadCast
    },dispatch)
}
function convertToStore (store){
    return{
        allProducts:store.allProducts
    }
}

export default connect(convertToStore,actionDispatch)(EditProduct);