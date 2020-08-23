import React from 'react';
// import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux';
// import deleteProductBroadCast from '../actions/deleteProductBroadcast'
class  ProductDetail extends React.Component {
    state = {  }

    deleteById=()=>{
        console.log(this.props.id)
        this.props.deleteId(this.props.id)
    }
    editById=()=>{
        this.props.editId(this.props.id)
    }
    render() { 
        return ( 
                     <tr>
                        <td>{this.props.id}</td>
                        <td>{this.props.name}</td>
                        <td>{this.props.price}</td>
                        <td>{this.props.quantity}</td>
                        <td>{this.props.category}</td>
                        <td><button onClick={this.editById}>Edit</button></td>
                        <td><button onClick={this.deleteById}>Delete</button></td>
                    </tr>
                   
               
         
         );
    }
}
// function actionDispatch(dispatch){
//     console.log("dispatch")
//     return bindActionCreators({
        
//         deleteById:deleteProductBroadCast,
       
//     },dispatch)
// }
 
export default ProductDetail;