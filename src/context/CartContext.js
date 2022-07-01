import { createContext, useReducer } from "react";

export const CartContext = createContext()
const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]')
}

const reducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'ADD_CART':
            return {
                cartItems: payload.cartItems
                // ...state,
                // cartItems: [...state.cartItems, { ...payload, qty: 1 }]
            }
        case 'REMOVE_CART':
            return {
                cartItems: payload.cartItems
                // ...state,
                // cartItems: state.cartItems.filter((index) => index.id !== payload.id)
            }
        case 'CHANGE_QTY_ADD':
            return {
                cartItems: payload.cartItems
                // ...state,
                // cartItems: state.cartItems.filter((c) =>
                //     c.id === payload.id ? (c.qty + 1) : c.qty)
            }
        case 'CHANGE_QTY_REMOVE':
            return {
                cartItems: payload.cartItems
                // ...state,
                // cartItems: state.cartItems.filter((c) =>
                //     c.id === payload.id ? (c.qty - 1) : c.qty)
            }
        default:
            return state
    }
}

export const CartContextProvider = ({ children }) => {
    const [cartState, cartDispatch] = useReducer(reducer, initialState)

    return (
        <CartContext.Provider value={[cartState, cartDispatch]}>
            {children}
        </CartContext.Provider>
    )
}