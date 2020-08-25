const productReducer = function myReducer(state = null, action) {
    var products = []

    switch (action.type) {

        case "VIEW_PRODUCT":
            console.log(action.payload)
            return action.payload

        case "NEW_PRODUCT":
            let newProduct = [
                action.payload, ...state
            ]
            return newProduct;
            
        case "UPDATE_PRODUCT":
            let populateValue = state.filter((f) => {
                return f.id !== action.payload.id
            });
            let editProduct = [action.payload, ...populateValue]
            return editProduct


        case "SEARCH_PRODUCT":
            return action.payload

        default:
            break;
    }
    return products
}
export default productReducer