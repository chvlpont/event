import { cancelBookingForUser  } from "../../../../utils/eventservices";
import { getAuth } from "@clerk/nextjs/server";
import { corsMiddleware } from "@/corsMiddleware";

export async function OPTIONS(req) {
  const headers = new Headers();
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  return new Response(null, {
    status: 204,
    headers: headers,
  });
}

export async function POST(req) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');

  const res = {
    setHeader: (key, value) => headers.set(key, value),
  };

  // Apply CORS middleware
  await corsMiddleware(req, res);

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: headers,
    });
  }

  try {
    const { eventId } = await req.json();
    if (!eventId) {
      return new Response(JSON.stringify({ message: 'Event ID is required' }), {
        status: 400,
        headers: headers,
      });
    }

    const { userId } = getAuth(req);
    if (!userId) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: headers,
      });
    }

    await cancelBookingForUser(eventId, userId);
    return new Response(JSON.stringify({ message: 'Booking successfully removed.' }), {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error("Error removing booking:", error.message);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: headers,
    });
  }
}