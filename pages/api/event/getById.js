import { getEventById } from "../../../utils/eventservices";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { eventId } = req.query;
    try {
      const event = await getEventById(eventId);
      if (event) {
        res.status(200).json(event);
      } else {
        res.status(404).json({ error: "Event not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
