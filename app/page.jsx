"use client";

import { useUser } from "@clerk/nextjs";
import { saveUserToFirestore } from "../saveUser";
import React, { useEffect } from "react";
import { auth } from "@/firebase.config";
import { useAuth } from "@clerk/nextjs";
import { signInWithCustomToken } from "firebase/auth";

function HomePage() {
  const { user } = useUser();
  const { userId, isLoaded, getToken } = useAuth();

  // Function to log user information and sign in via Firebase Authentication
  useEffect(() => {
    const logUserInformation = async () => {
      // Check if user is loaded and authenticated
      if (user && userId && isLoaded) {
        // Log user information to console
        console.log("User information:", user);

        // Check if user data has been saved to database
        const isUserSaved = sessionStorage.getItem("isUserSaved");

        if (!isUserSaved) {
          // Save user data to database
          await saveUserToFirestore(user);
          sessionStorage.setItem("isUserSaved", "true");
        }

        // Sign in the user via Firebase Authentication
        const token = await getToken({ template: "integration_firebase" });
        const userCredentials = await signInWithCustomToken(auth, token || "");
        console.log("User:", userCredentials.user);
        console.log(
          userCredentials.user.uid,
          "has been stored in authentication!"
        );
      }
    };

    // Call function to log user information
    logUserInformation();
  }, [user, userId, isLoaded, getToken]);

  return <div>HomePage</div>;
}

export default HomePage;
