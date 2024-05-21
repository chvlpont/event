import { removeBooking } from "../../../../utils/eventservices";
import { withAuth } from '@clerk/nextjs/api';

async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { eventId } = await req.json();

  if (!eventId) {
    return new Response(JSON.stringify({ message: 'Event ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await removeBooking(eventId);
    return new Response(JSON.stringify({ message: 'Booking successfully removed.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const POST = withAuth(handler);
