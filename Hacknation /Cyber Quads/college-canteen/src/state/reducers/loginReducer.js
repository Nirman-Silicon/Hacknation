const reducer = (state = false, action) => {
    // console.log(action.payload);
    if(action.type==="set-Login"){
        // console.log("login set to "+state);
        return action.payload;
    }
    return state;
}

export default reducer;