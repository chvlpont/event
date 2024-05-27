import { getAllUsers } from "../../utils/dataFetching";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const users = await getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
