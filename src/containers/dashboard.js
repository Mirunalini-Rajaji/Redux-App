import React from 'react';
import Chart from "react-google-charts";
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import viewProductBroadCast from '../actions/viewProductBroadCast';
import Navbar from '../navbar/navbar';





var unique = [];
class Dashboard extends React.Component {

    state = {
        products: [],
        unique: [],
        filter: [],

        chatData: [
            ["productName", "quantity"]
        ],
        barData: [
            ["Category", "quantity"]
        ]


    }

    componentDidMount() {
        this.getAllProducts()
    }

    getAllProducts = () => {
        axios.get("http://localhost:3000/allProducts").then(response => {
            this.props.viewProduct(response.data)
            this.setState({ products: response.data }, () => {
                var myarray = [];


                this.state.products.map(pr => {
                    return this.state.chatData.push([pr.name, parseInt(pr.quantity)]) &&
                        myarray.push(pr.category)

                })
                unique = myarray.filter((v, i, a) => a.indexOf(v) === i);
                this.setState({ unique: unique })
                var products = []
                unique.map((c) => {
                    console.log(c)
                   products = this.state.products.filter(p => p.category === c)

                    var sum1 = 0
                     products.map((p) => {
                       return sum1 = parseInt(sum1) + parseInt(p.quantity)
                        
                    })
                    this.state.barData.push([c, sum1])
                    console.log(this.state.barData)
                })
            })


        }, error => {
            console.log(error)
        })

    }



    render() {
        return (
            <div>
              <Navbar></Navbar>
                <div >

                    <div className="containerd" style={{ padding: '100px', height: '100%', marginTop: '0px', alignContent: 'center' }} >
                        <Chart
                            width="90%"
                            height={'400px'}
                            chartType="PieChart"
                            data={this.state.barData}
                            options={{
                                title: 'Top Categories', is3D: true,
                            }}
                            rootProps={{ 'data-testid': '1' }}>
                        </Chart>

                        <Chart
                            width="80%"
                            height={'300px'}
                            chartType="Histogram"
                            data={this.state.chatData}
                            options={{
                                title: 'Product Details',
                                legend: { position: 'none' },
                            }}
                            rootProps={{ 'data-testid': '1' }}>
                        </Chart>
                    </div>

                </div>
            </div>
        );
    }
}


function actionDispatch(dispatch) {
    console.log("dispatch")
    return bindActionCreators({
        viewProduct: viewProductBroadCast
        

    }, dispatch)
}

export default connect(null,actionDispatch)(Dashboard);