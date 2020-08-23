import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import deleteProductBroadCast from '../actions/deleteProductBroadcast'
import viewProductBroadCast from '../actions/viewProductBroadCast';
import searchProductBroadCast from '../actions/searchProductBroadCast';
import '../css/style.css'

class Product extends React.Component {
    constructor(props){
        super(props)
        this.state={
            // products:this.props.allProducts,
            myid:0,
            searchValue:''
        }
    }
    // componentWillMount(){
    //     if(this.props.allProducts.length===0){
    //         this.getAllProducts()
    //     }
        
    // }
    // getAllProducts=()=>{
    //     Axios.get('http://localhost:3000/allProducts').then(res=>{
    //         this.props.viewProduct(res.data)
    //     })
    // }
    deleteProductById=(id)=>{
        console.log(id)
        this.props.deleteById(id)
       
    }
    editProductById = (id) => {
        // this.setState({ myid: id })
       console.log(id)
        this.props.history.push({
            pathname: '/editproduct',
            state:  id 
        })
    }
    renderAllProducts=()=>{
        return this.props.allProducts.map(product => {
            return (
                <div className="row">
                    <div className="column">
                        <div className="card" key={product.id}>
                            <img src={"images/"+ product.image } height="170px" width="170px" alt="profile"></img>
                            <h2>{product.name}</h2>
                            <h4>Price :{product.price}</h4>
                            <h4>Quantity:{product.quantity}</h4>
                            {/* <h4>{product.category}</h4> */}
                            <h4>{product.stock}</h4>
                            <button onClick={()=>this.editProductById(product.id)}>Edit</button>
                            <button onClick={()=>this.deleteProductById(product)}>Delete</button>
                        </div>
                    </div>
               </div>                    
               
            )
        })
    }
    // search = (e) => {
    //     e.preventDefault()
    //     let searchV = e.target.value
    //     if (searchV !== '') {
          
    //     // this.setState({ searchValue: searchV })
    //     console.log(searchV);
    //     let searchF = this.props.allProducts.filter(f => {
    //         return (f.name.toLowerCase().match(searchV.toLowerCase().trim()) ||
    //             f.category.toLowerCase().match(searchV.toLowerCase().trim()))

    //     })
    //     console.log(searchF);
    //     return this.props.setSearch(searchF)
    // }
    // return this.props.setSearch([])

    // }
    
    render() { 
        if(this.props.allProducts.length===0){
            return (<h2>No Products to display!!</h2>);
        }
        return ( 
            <div>
            <div>
                <input type="text" className="searchBar" style={{marginTop: '20px'}}  placeholder="Search by name or category"
                onChange={(e)=>this.props.setSearch(e.target.value)}></input>
                {/* <table>
                    <thead>
                        <tr>
                            {/* <th>Id</th> */}
                            {/* <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead> */} 
                    
                        {this.renderAllProducts()}
                   
                {/* </table> */}
            </div>
            </div>
         );
    }
}
function mapStatesToProps(store){
    return {
        allProducts:store.allProducts
    }
}
function actionDispatch(dispatch){
    console.log("dispatch")
    return bindActionCreators({
        viewProduct:viewProductBroadCast,
        deleteById:deleteProductBroadCast,
        setSearch:searchProductBroadCast
       
    },dispatch)
}
 
export default connect(mapStatesToProps,actionDispatch)(Product);