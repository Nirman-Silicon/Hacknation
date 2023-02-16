import { combineReducers } from "redux"
import quantityReducer from "./quantityReducer"
import cartReducer from "./cartReducer"
import loginReducer from "./loginReducer"
import themeReducer from "./themeReducer"
import cartSizeReducer from "./cartSizeReducer"
import cartPriceReducer from "./cartPriceReducer"

const reducers=combineReducers({
    quantity:quantityReducer,
    cart:cartReducer,
    login:loginReducer,
    theme:themeReducer,
    cartSize:cartSizeReducer,
    cartPrice:cartPriceReducer,
})

export default reducers