"use client";
import React from "react";
import LandingPage from "./_components/landing-page";
import { auth } from "@/firebase.config";
import { useAuth } from "@clerk/nextjs";
import { signInWithCustomToken } from "firebase/auth";
import { useEffect } from "react";

const HomePage = () => {
  const { userId, isLoaded, getToken } = useAuth();

  useEffect(() => {
    if (!isLoaded || !userId) return; // Check if the user is loaded and exists

    const signInWithClerk = async () => {
      const token = await getToken({ template: "integration_firebase" });
      const userCredentials = await signInWithCustomToken(auth, token || "");
      console.log("User:", userCredentials.user);
    };

    signInWithClerk();
  }, [isLoaded, userId, getToken]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return <LandingPage />;
};

export default HomePage;
