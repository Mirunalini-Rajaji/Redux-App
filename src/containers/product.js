import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import viewProductBroadCast from '../actions/viewProductBroadCast';
import searchProductBroadCast from '../actions/searchProductBroadCast';
import '../css/style.css'
import Axios from 'axios';

import Pagination from './pagination';

class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            myid: 0,
            searchValue: '',
            sortvalue:false,
            currentPage:1,
            postPerPage:3
        }
    }
    componentWillMount() {

        this.getAllProducts()


    }
    getAllProducts = () => {
        Axios.get('http://localhost:3000/allProducts').then(res => {
            this.props.viewProduct(res.data)
            this.setState({ products: this.props.allProducts })

        })
    }
    deleteProductById = (id) => {
        console.log(id)
        Axios.delete("http://localhost:3000/allProducts/" + id).then(response => {

            this.getAllProducts()
        })

    }
    editProductById = (id) => {

        console.log(id)
        this.props.history.push({
            pathname: '/editproduct',
            state: id
        })
    }
    renderAllProducts = () => { const indexOfLastProd = this.state.currentPage*this.state.postPerPage;
        const indexOfFirstProd = indexOfLastProd-this.state.postPerPage;
        const currentProd = this.props.allProducts.slice(indexOfFirstProd,indexOfLastProd);
        return currentProd.map(product => {
            return (
                <div className="row">
                    <div className="column">
                        <div className="card" >
                            
                            <img src={"images/" + product.image} height="170px" width="170px" alt="profile"></img>
                            <h2>{product.name}</h2>
                            <h4>Price :{product.price}</h4>
                            <h4>Quantity:{product.quantity}</h4>
                            <h4>Category:{product.category}</h4>
                            <button onClick={() => this.editProductById(product.id)}>Edit</button>
                            <button onClick={() => this.deleteProductById(product.id)}>Delete</button>
                        </div>
                    </div>
                </div>

            )
        })
    }

    search = (e) => {
        let searchV = e.target.value
        if (searchV === '') {
            this.getAllProducts()
        }
        this.setState({ searchValue: searchV })
        console.log(searchV);
        let searchF = this.state.products.filter(f => {
            return f.name.toLowerCase().match(searchV.toLowerCase().trim())
               
        })
        console.log(searchF);
        this.props.setSearch(searchF)
        this.setState({sortvalue:false})
    }
    sortProducts=()=>{
        const newlist=this.props.allProducts;
        if(this.state.sortvalue===false){
            newlist.sort((a,b)=>
                a.price - b.price)            
            this.setState({products:newlist})
            return this.setState({sortvalue:true})
        }
        if(this.state.sortvalue===true){
           
            newlist.sort((a,b)=>
            b.price - a.price)            
        this.setState({products:newlist})
            // this.getAllProducts()
            return this.setState({sortvalue:false})
        }

    }
    paginate=(pages)=>{
        this.setState({currentPage:pages})
    } 

    render() {

        return (

            <div>
                
                <input type="text" className="searchBar" style={{ marginTop: '20px' }} placeholder="Search by name or category"
                    value={this.state.searchValue} onChange={this.search}></input>
                <button type="submit" className="logo" onClick={this.sortProducts}>Sort by price</button>
               
                {this.renderAllProducts()}
                <Pagination prodPerPage={this.state.postPerPage} totalProd={this.props.allProducts.length} paginate={this.paginate}></Pagination>

            </div>

        );
    }
}
function mapStatesToProps(store) {
    return {
        allProducts: store.allProducts
    }
}
function actionDispatch(dispatch) {
    console.log("dispatch")
    return bindActionCreators({
        viewProduct: viewProductBroadCast,
        setSearch: searchProductBroadCast

    }, dispatch)
}

export default connect(mapStatesToProps, actionDispatch)(Product);