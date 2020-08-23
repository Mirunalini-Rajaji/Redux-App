import {combineReducers} from 'redux'
import productReducer from './productReducer'

const allReducers = combineReducers({
    allProducts:productReducer

})
export default allReducers