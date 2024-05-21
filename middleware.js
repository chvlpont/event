import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { db } from "./firebase.config"; // Ensure the correct path to firebase.config.js
import { getDocs, collection } from "firebase/firestore";
import { NextResponse } from "next/server";

//The code makes Node.js mimic a browser by setting global.navigator.userAgent.
global.navigator = {
  userAgent: "node.js",
};

// Define protected routes
const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // Debug logging
    console.log("Auth user ID:", auth().userId);

    // Check if the user is authenticated
    if (!auth().userId) {
      console.error("User not authenticated");
      return NextResponse.redirect(new URL("/", req.url).toString());
    }

    // Get the logged-in user's ID from the authentication context
    const userId = auth().userId;
    console.log("User ID:", userId);

    try {
      // Get the collection reference
      const adminsCollection = collection(db, "admins");

      // Get all documents in the collection
      const snapshot = await getDocs(adminsCollection);

      // Check if userId exists in any document
      let userIsAdmin = false;
      snapshot.forEach((doc) => {
        if (doc.data().userId === userId) {
          userIsAdmin = true;
        }
      });

      if (!userIsAdmin) {
        console.error("User is not an admin");
        return NextResponse.redirect(new URL("/", req.url).toString());
      }
    } catch (error) {
      console.error("Error checking admin status:", error.message); // Log the specific error message
      return NextResponse.redirect(new URL("/", req.url).toString());
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
