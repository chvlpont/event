import { getEvents } from "../../../utils/eventservices";
import { corsMiddleware } from "@/corsMiddleware";

export const GET = async (req) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  try {
    // Create a custom response object to pass to middleware
    const res = {
      setHeader: (key, value) => headers.set(key, value),
    };

    // Apply CORS middleware
    await corsMiddleware(req, res);

    // Fetch events data
    const events = await getEvents();

    // Return the fetched events with CORS headers included
    return new Response(JSON.stringify(events), {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    // Return the error response with CORS headers included
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: headers,
    });
  }
};