import { fetchAllUsernames } from "../../utils/dataFetching";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const allUsernames = await fetchAllUsernames();
      res.status(200).json({ usernames: allUsernames });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
