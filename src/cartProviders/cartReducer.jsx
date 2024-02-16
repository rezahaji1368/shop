
const addProductToCart = (state, product) => {
  const updatedCart = [...state.cart];
  const index = updatedCart.findIndex((item) => item.id === product.id);
  if (index < 0) {
    updatedCart.push({ ...product, quantity: 1 });
  } else {
    const updatedItem = { ...updatedCart[index] };
    updatedItem.quantity++;
    updatedCart[index] = updatedItem;
  }

  return { ...state, total: state.total + product.offPrice, cart: updatedCart };
};
const removeProductFromCart = (state, product) => {
  const updatedCart = [...state.cart];
  const index = updatedCart.findIndex((item) => item.id === product.id);
  const updatedItem = { ...updatedCart[index] };
  if (updatedItem.quantity === 1) {
    const update = updatedCart.filter((item) => item.id !== product.id);
    return { ...state, total: state.total - product.offPrice, cart: update };
  } else {
    updatedItem.quantity--;
    updatedCart[index] = updatedItem;
    return { ...state, total: state.total - product.offPrice, cart: updatedCart };
  }
};
const cartReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return addProductToCart(state, action.product);
    case "remove":
      return removeProductFromCart(state, action.product);
    default:
      return state;
  }
};
export default cartReducer;
