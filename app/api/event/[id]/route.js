import { getEventById } from "../../../../utils/eventservices";
import { corsMiddleware } from "@/corsMiddleware";

export async function GET(req, { params }) {
  const { id } = params; // Extract 'id' from the URL parameters

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  try {
    // Create a custom response object to pass to middleware
    const res = {
      setHeader: (key, value) => headers.set(key, value),
    };

    // Apply CORS middleware
    await corsMiddleware(req, res);

    const event = await getEventById(id);
    if (event) {
      return new Response(JSON.stringify(event), {
        status: 200,
        headers: headers,
      });
    } else {
      return new Response(JSON.stringify({ error: "Event not found" }), {
        status: 404,
        headers: headers,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: headers,
    });
  }
}