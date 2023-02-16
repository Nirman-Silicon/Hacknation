const reducer=(state=[], action)=>{
    // console.log("from cartReducer cart "+state);
    // console.log(action);
    if(action.type==="setCart"&&action.payload!==undefined){
        // console.log(action.payload);
        // console.log("cart set to "+state);
        // console.log(state)
        return action.payload;
    }
    return state;
}

export default reducer;