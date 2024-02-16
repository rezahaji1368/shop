export const loginUserReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
      };
    case "signup":
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
      };
    default:
      return state;
  }
};
