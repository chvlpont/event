Event is a collaborative project aimed at building a backoffice system with a CMS for managing events. Developed using Next.js, the full-stack application utilizes a Backend as a Service (BaaS) Firebase.

Key Features:
Event Management: Create, edit, and delete events with essential details like location, date & time, title, and available seats.

User Booking: Users can book seats for events, and their IDs are stored in a list associated with the event. Once all seats are booked, no further bookings are allowed.

Event Attendance: Display a list of participants who have signed up for an event, showing either their names or email addresses.

Authentication: Utilize an authentication service (Clerk) to register and manage user access. Only registered administrators can access the backoffice system.

Admin Rights Management: Admins can promote other users to administrators.

Landing Page Customization: All content on the public landing page can be edited via the CMS.

Content Editing: Provide a separate page within the system to easily edit all content on the landing page.

API: Implement an API using Next.js routes to fetch all events, retrieve individual event details, book and cancel event bookings.
Description

Dependencies
@clerk/clerk-react, @clerk/nextjs, @emotion/react, @emotion/styled, @mui/material, @radix-ui/react-dropdown-menu, @radix-ui/react-label, @radix-ui/react-slot, class-variance-authority, clsx, cors, firebase, shadcn, lucide-react, next, next-themes, react, react-dom, react-icons, react-modal, react-spinners, react-toastify, tailwind-merge, tailwindcss-animate
Dev Dependencies
eslint, eslint-config-next, postcss, tailwindcss

Usage:
Clone the repository and npm install, add necessary environment variables for authentication. Start the development server: npm run dev Open in browser: Visit http://localhost:8080 to view the application.

License
ISC License.

Note
Product descriptions and images are borrowed from Google and may not be used without permission.
