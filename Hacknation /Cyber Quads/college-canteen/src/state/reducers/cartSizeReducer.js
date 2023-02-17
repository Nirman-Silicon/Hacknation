const reducer = (state = 0, action) => {
    if(action.type==="setCartSize"){
        return action.payload;
    }
    return state;
}

export default reducer;