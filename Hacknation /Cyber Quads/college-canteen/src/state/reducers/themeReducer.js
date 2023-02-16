const reducer = (state = false, action) => {
    if(action.type==="set-Theme-Dark"){
        // console.log(action)
        localStorage.setItem('darkTheme', Boolean(action.payload));
        // console.log("set Theme "+localStorage.getItem('darkTheme'))
        return action.payload;
    }
    return state;
}

export default reducer;