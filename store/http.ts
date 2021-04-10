import { HeaderSet, HttpMethod, Body } from "../lib/http";


export type HttpRequestState = {  
  url: string;
  method: HttpMethod;
  headers: HeaderSet;
  body: Body;
  response: any;
  statusCode: number;
  responseCookie: string;
}

export const initialState = {
  url: "",
  method: "" as HttpMethod,
  headers: {},
  body: null,
  response: "",
  statusCode: 0,
  responseCookie: "",
}

export type HttpRequestAction = {
  type: "SET_URL" | "SET_METHOD" | "SET_HEADERS" | "SET_BODY" | "SET_RESPONSE";
  payload: HttpRequestState;
}


export function httpRequestReducer(state: HttpRequestState, action: HttpRequestAction) {
  switch(action.type) {
    case "SET_URL": return { ...action.payload };
    case "SET_METHOD": return { ...action.payload };
    case "SET_HEADERS": return { ...action.payload };
    case "SET_BODY": return { ...action.payload };
    case "SET_RESPONSE": return { ...action.payload };
    default: return state;
  }
}
