const viewProductBroadCast = function(products){
    return({
        type:"VIEW_PRODUCT",
        payload:products
    }
    )
}
export default viewProductBroadCast