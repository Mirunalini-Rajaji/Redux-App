const deleteProductBroadCast = function(products){
    console.log(products)
    return ({
    

        type:'DELETE_PRODUCT',
        payload:products
    }
   
    )
}

export default deleteProductBroadCast