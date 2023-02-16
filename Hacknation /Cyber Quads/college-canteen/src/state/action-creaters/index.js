export const decqt = (quantity, foodId) => {
    // console.log("update the fucking cart you idiot. cart no." + foodId)
    return (dispatch) => {
        dispatch({
            type: "decrease",
            payload: quantity,
        })
    }
}

export const incqt = (quantity) => {
    return (dispatch) => {
        dispatch({
            type: "increase",
            payload: quantity,
        })
    }
}

export const setCart = (cart) => {
    return (dispatch) => {
        dispatch({
            type: "setCart",
            payload: cart,
        })
    }
}
export const setCartSize = (cartSize) => {
    return (dispatch) => {
        dispatch({
            type: "setCartSize",
            payload: cartSize,
        })
    }
}

export const setCartPrice = (cartPrice) => {
    return (dispatch) => {
        dispatch({
            type: "setCartPrice",
            payload: cartPrice,
        })
    }
}

export const setLogin = (login) =>{
    return (dispatch) => {
        dispatch({
            type: "set-Login",
            payload: login,
        })
    }
}

export const setThemeDark = (theme) =>{
    return (dispatch) => {
        dispatch({
            type: "set-Theme-Dark",
            payload: theme,
        })
    }
}
