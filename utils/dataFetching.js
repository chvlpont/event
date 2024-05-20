import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import { clerkClient } from "@clerk/nextjs/server";

// Function to fetch usernames for admin users
export async function fetchUserData(adminIds) {
  try {
    const adminUsernames = await Promise.all(
      adminIds.map(async (userId) => {
        const user = await clerkClient.users.getUser(userId);
        const username =
          user && user.username ? user.username : "default_username";
        return {
          userId,
          username,
          createdAt: new Date(user.createdAt).toLocaleDateString(),
          lastSignInAt: new Date(user.lastSignInAt).toLocaleDateString(),
        };
      })
    );
    // console.log("Admin Usernames:", adminUsernames);
    return adminUsernames;
  } catch (error) {
    console.error("Error fetching admin user data:", error);
    throw new Error("Failed to fetch admin user data");
  }
}

// Function to fetch admin IDs from Firebase
export async function fetchAdminIds() {
  try {
    const querySnapshot = await getDocs(collection(db, "admins"));
    const adminIds = querySnapshot.docs.map((doc) => doc.data().userId);
    return adminIds;
  } catch (error) {
    console.error("Error fetching admin IDs:", error);
    throw new Error("Failed to fetch admin IDs");
  }
}

// Function to fetch usernames for non-admin users
export async function fetchNonAdminUserData() {
  try {
    const adminIds = await fetchAdminIds();
    const userListResponse = await clerkClient.users.getUserList();
    const allUsers = userListResponse.data; // Access the data array
    // console.log(userListResponse);

    // Filter out non-admin users
    const nonAdminUsers = allUsers.filter(
      (user) => !adminIds.includes(user.id)
    );

    // Fetch data for non-admin users
    const nonAdminUsernames = await Promise.all(
      nonAdminUsers.map(async (user) => {
        const username = user.username ? user.username : "default_username";
        return {
          userId: user.id,
          username,
          createdAt: new Date(user.createdAt).toLocaleDateString(),
          lastSignInAt: new Date(user.lastSignInAt).toLocaleDateString(),
        };
      })
    );

    // console.log("Non-Admin Usernames:", nonAdminUsernames); // Log the final non-admin usernames array
    return nonAdminUsernames;
  } catch (error) {
    console.error("Error fetching non-admin user data:", error);
    throw new Error("Failed to fetch non-admin user data");
  }
}
