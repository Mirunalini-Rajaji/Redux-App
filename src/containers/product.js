import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import viewProductBroadCast from '../actions/viewProductBroadCast';
import searchProductBroadCast from '../actions/searchProductBroadCast';
import '../css/style.css'
import Axios from 'axios';

class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            myid: 0,
            searchValue: ''
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
    renderAllProducts = () => {
        return this.props.allProducts.map(product => {
            return (
                <div className="row">
                    <div className="column">
                        <div className="card" key={product.id}>
                            <img src={"images/" + product.image} height="170px" width="170px" alt="profile"></img>
                            <h2>{product.name}</h2>
                            <h4>Price :{product.price}</h4>
                            <h4>Quantity:{product.quantity}</h4>
                            <h4>{product.stock}</h4>
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
            return (f.name.toLowerCase().match(searchV.toLowerCase().trim()) ||
                f.category.toLowerCase().match(searchV.toLowerCase().trim()))


        })
        console.log(searchF);
        this.props.setSearch(searchF)
    }

    render() {

        return (

            <div>
                <input type="text" className="searchBar" style={{ marginTop: '20px' }} placeholder="Search by name or category"
                    value={this.state.searchValue} onChange={this.search}></input>
                       

                {this.renderAllProducts()}


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