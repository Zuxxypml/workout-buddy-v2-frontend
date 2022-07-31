import { createContext, useReducer } from "react";
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      localStorage.setItem("user", JSON.stringify(null));
      return { user: null };
    case "SIGNUP":
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
