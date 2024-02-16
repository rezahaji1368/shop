import { createContext, useContext, useReducer } from "react";
import cartReducer from "./cartReducer";
// import { products } from "../Data";


export const CartContext = createContext();
export const CartContextDispatcher = createContext();
const initialState={
  cart:[],
  total:0
}

const CartProviders = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={cartItems}>
      <CartContextDispatcher.Provider value={dispatch}>
        {children}
      </CartContextDispatcher.Provider>
    </CartContext.Provider>
  );
};

export default CartProviders;
export const useCarts = ()=>useContext(CartContext);
export const useCartsAction=()=>useContext(CartContextDispatcher)
