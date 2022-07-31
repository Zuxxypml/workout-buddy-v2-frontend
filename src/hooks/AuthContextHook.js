import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error(
      "useAuthContext Hook Should be used in a AuthContext Provider "
    );
  }
  return context;
};
