import { createContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  cartItems: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "addItem": {
      return {
        ...state,
        cartItems: [...state?.cartItems, action.payload],
      };
    }
    case "clearCart": {
      return {
        ...state,
        cartItems: [],
      };
    }
    default:
      throw new Error("Unknown action type");
  }
}

function CartProvider({ children }) {
  const [{ cartItems }, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider
      value={{
        cartItems,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
