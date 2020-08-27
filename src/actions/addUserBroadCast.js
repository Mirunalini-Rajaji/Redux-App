const addUserBroadCast = function (users){
    return ({
        type:"ADD_USER",
        payload:users
    })
}
export default addUserBroadCast