const userReducer = function allUsers(state=null,action){
    var users=[]
    switch (action.type) {
        case "ADD_USER":
            let newUser = [
                action.payload, ...state
            ]
            return newUser;
    
        default:
            break;
    }
    return users
}
export default userReducer