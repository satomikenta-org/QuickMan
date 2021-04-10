import { useContext } from "react";
import { HttpRequestContext } from "../pages/_app";

export const useHttpReqCtx = () => useContext(HttpRequestContext); 

