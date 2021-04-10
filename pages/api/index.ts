import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cookie', "dummy");
  return res.json({ message: "success" });
}