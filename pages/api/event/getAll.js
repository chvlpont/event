import { getEvents } from "../../../utils/eventservices";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const events = await getEvents();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
