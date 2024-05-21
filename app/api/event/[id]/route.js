import { getEventById } from "../../../../utils/eventservices";

export async function GET(req, { params }) {
  const { id } = params; // Extract 'id' from the URL parameters
  try {
    const event = await getEventById(id);
    if (event) {
      return new Response(JSON.stringify(event), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ error: "Event not found" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
