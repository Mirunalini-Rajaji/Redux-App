const updateProductBroadCast = function(products){
    return ({
        type:'UPDATE_PRODUCT',
        payload:products
    })
}
export default updateProductBroadCast