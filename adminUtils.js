import { collection, addDoc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase.config"; // Import Firestore database reference from firebaseConfig.js

// Function to save user ID as admin in Firestore
// Function to save user ID as admin in Firestore
export async function saveAdminToFirestore(userId) {
  try {
    // Check if userId is undefined or null
    if (!userId) {
      console.error("Invalid userId:", userId);
      return; // Exit function if userId is not valid
    }

    // Create a reference to the admins collection in Firestore
    const adminsCollection = collection(db, "admins");

    // Add a new document with the admin's user ID
    await addDoc(adminsCollection, {
      userId: userId,
      // Add more fields as needed
    });

    console.log("Admin added to Firestore successfully.");
  } catch (error) {
    console.error("Error adding admin to Firestore:", error);
    throw error; // Optionally rethrow the error to handle it elsewhere
  }
}

// // Hardcoded user ID of username "pontilord"
// const userId = "user_2gZ3KEeMHlB7JZysmujuJw6k0hS";

// Call the function to assign the user ID as admin
// saveAdminToFirestore(userId);

// Function to remove user ID from admin list in Firestore
export async function removeAdminFromFirestore(userId) {
  try {
    if (!userId) {
      console.error("Invalid userId:", userId);
      return;
    }

    // Get a reference to the "admins" collection
    const adminsCollection = collection(db, "admins");

    // Query for the document with the specified userId
    const querySnapshot = await getDocs(adminsCollection);
    querySnapshot.forEach((doc) => {
      if (doc.data().userId === userId) {
        // Delete the document with the matching userId
        deleteDoc(doc.ref);
        console.log("Admin removed from Firestore successfully.");
      }
    });
  } catch (error) {
    console.error("Error removing admin from Firestore:", error);
    throw error;
  }
}
