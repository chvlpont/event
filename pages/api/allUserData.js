import { fetchBookedUsernames } from "../../utils/dataFetching";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Assuming eventId is passed in the query parameters
      const eventId = req.query.eventId;

      // Fetch usernames of booked users for the specified event
      const bookedUsernames = await fetchBookedUsernames(eventId);

      res.status(200).json({ usernames: bookedUsernames });
    } catch (error) {
      console.error("Error fetching booked user names:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
