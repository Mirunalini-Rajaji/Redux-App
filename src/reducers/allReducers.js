import {combineReducers} from 'redux'
import productReducer from './productReducer'
import userReducer from './userReducer'

const allReducers = combineReducers({
    allProducts:productReducer,
    allUsers:userReducer

})
export default allReducers