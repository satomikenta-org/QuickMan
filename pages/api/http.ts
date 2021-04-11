import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const { url, method, headers, body } = req.body;
  try {
    const response = await axios[method](url, headers || {}, body || {});
    return res.json({ 
      response: response.data, 
      status: response.status, 
      responseCookie: response.headers['cookie'] || response.headers['Cookie'] 
    });
  } catch (ex) {
    return res.json({
      response: ex.response?.statusText,
      status: ex.response?.status,
      responseCookie: ""
    });
  }
}