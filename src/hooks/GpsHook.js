
import { useContext } from "react";
import GpsContext from "../contexts/GpsContext";

export default function GpsAuth() {
  return useContext(GpsContext)
}