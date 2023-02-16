const reducer = (state = 0, action) => {
    if(action.type==="setCartPrice"){
        return action.payload;
    }
    return state;
}

export default reducer;