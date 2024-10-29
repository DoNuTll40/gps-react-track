
import { useContext } from "react";
import WSContext from "../contexts/WSContext";

export default function WSHook() {
  return useContext(WSContext)
}