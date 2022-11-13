import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_: NextApiRequest, res: NextApiResponse<any>) {
  return res
    .status(200)
    .json({ apiUrl: process.env.API_URL || "http://localhost:5000" });
}
