import {
  fetchAdminIds,
  fetchUserData,
  fetchNonAdminUserData,
} from "../../utils/dataFetching";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const adminIds = await fetchAdminIds();
      const adminUsernames = await fetchUserData(adminIds);
      const nonAdminUsernames = await fetchNonAdminUserData();

      res.status(200).json({ adminUsernames, nonAdminUsernames });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
