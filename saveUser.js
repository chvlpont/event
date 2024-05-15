import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase.config"; // Import Firestore database reference from firebaseConfig.js

// Function to save user data to Firestore
export async function saveUserToFirestore(user) {
  try {
    // Create a reference to the users collection in Firestore
    const usersCollection = collection(db, "users");

    // Extract relevant user information
    const { id, username } = user;
    let email = ""; // Initialize email as an empty string

    // Check if the user has provided an email address
    if (user.emailAddresses && user.emailAddresses.length > 0) {
      // Extract the email address if available
      email = user.emailAddresses[0].emailAddress;
    }

    const isAdmin = false;

    // Add a new document with the user's data
    await addDoc(usersCollection, {
      userId: id,
      username: username,
      email: email,
      isAdmin: isAdmin,
      // Add more fields as needed
    });

    console.log("User added to Firestore successfully.");
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
    throw error; // Optionally rethrow the error to handle it elsewhere
  }
}
