import { useContext } from "react";
import AuthContext from "../contexts/AppContext";

export default function UseAuth() {
  return useContext(AuthContext)
}
