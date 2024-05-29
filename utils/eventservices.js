import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase.config"; // Import Firestore database and Storage references
import { useClerk } from "@clerk/nextjs"; // Import Clerk hook for authentication

export async function createEvent(
  title,
  date,
  description,
  imageFile,
  category,
  location,
  numberOfSeats
) {
  try {
    if (!imageFile) {
      throw new Error("Image file is required.");
    }

    const imageRef = ref(storage, `images/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);

    // Get download URL of the uploaded image
    const imageUrl = await getDownloadURL(imageRef);

    const eventsCollection = collection(db, "events");
    const newEvent = {
      title,
      date,
      description,
      imageUrl,
      category,
      location,
      numberOfSeats,
      bookedUsers: [], // Initialize bookedUsers as an empty array
    };

    const eventRef = await addDoc(eventsCollection, newEvent);
    console.log("Event created successfully! Event ID:", eventRef.id);
    return eventRef.id;
  } catch (error) {
    console.error("Error creating event:", error.message);
    throw error;
  }
}

// Function to retrieve all events
export async function getEvents() {
  try {
    const eventsCollection = collection(db, "events");
    const snapshot = await getDocs(eventsCollection);
    const events = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return events;
  } catch (error) {
    console.error("Error getting events:", error);
    throw error;
  }
}

// Function to retrieve an event by ID
export async function getEventById(eventId) {
  try {
    const eventRef = doc(db, "events", eventId);
    const docSnapshot = await getDoc(eventRef);

    if (docSnapshot.exists()) {
      return {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      };
    } else {
      console.log("No such event document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting event by ID:", error);
    throw error;
  }
}

// Function to update an existing event
export async function updateEvent(eventId, updatedData, imageFile = null) {
  try {
    const eventRef = doc(db, "events", eventId);

    // If imageFile is provided, update the image
    if (imageFile) {
      const imageRef = ref(storage, `images/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);

      // Get download URL of the uploaded image
      updatedData.imageUrl = await getDownloadURL(imageRef);
    }

    await updateDoc(eventRef, updatedData);
    console.log("Event updated successfully!");
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
}

// Function to delete an event
export async function deleteEvent(eventId) {
  try {
    const eventRef = doc(db, "events", eventId);
    await deleteDoc(eventRef);
    console.log("Event deleted successfully!");
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
}

// Function to book an event for a Clerk user
export async function bookEventForUser(eventId, userId) {
  try {
    const eventRef = doc(db, "events", eventId);
    const eventDoc = await getDoc(eventRef);

    if (eventDoc.exists()) {
      const eventData = eventDoc.data();
      const numberOfSeats = eventData.numberOfSeats || 0; // Get the total number of seats
      const bookedUsers = eventData.bookedUsers || []; // Get the array of booked users

      // Check if all seats are already booked
      if (bookedUsers.length >= numberOfSeats) {
        throw new Error("This event is fully booked.");
      }

      // Check if the user is already booked for the event
      if (bookedUsers.includes(userId)) {
        throw new Error("User already booked for this event.");
      }

      // Add the user to the 'bookedUsers' array
      bookedUsers.push(userId);

      // Update the event document with the new 'bookedUsers' array
      await updateDoc(eventRef, { bookedUsers });

      console.log("User successfully booked for the event.");
    } else {
      throw new Error("Event does not exist.");
    }
  } catch (error) {
    console.error("Error booking event:", error);
    throw error;
  }
}

// Function to get events booked by a Clerk user
export async function getBookedEventsForUser() {
  try {
    const { user } = useClerk(); // Get the authenticated user from Clerk
    const eventsCollection = collection(db, "events");
    const snapshot = await getDocs(eventsCollection);
    const bookedEvents = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter(
        (event) => event.bookedUsers && event.bookedUsers.includes(user.id)
      );
    return bookedEvents;
  } catch (error) {
    console.error("Error getting booked events for user:", error);
    throw error;
  }
}

// Function to cancel booking for an event by a Clerk user
export async function cancelBookingForUser(eventId, userId) {
  try {
    const eventRef = doc(db, "events", eventId);
    const eventDoc = await getDoc(eventRef);

    if (eventDoc.exists()) {
      const eventData = eventDoc.data();
      // Check if the event has 'bookedUsers' array
      if (!eventData.bookedUsers) {
        console.log("No bookings found for this event.");
        return; // Exit function
      }

      // Remove the user from the 'bookedUsers' array
      const updatedBookedUsers = eventData.bookedUsers.filter(
        (id) => id !== userId
      );

      // Update the event document with the updated 'bookedUsers' array
      await updateDoc(eventRef, {
        bookedUsers: updatedBookedUsers,
      });

      console.log("Booking canceled successfully.");
    } else {
      console.log("Event does not exist.");
    }
  } catch (error) {
    console.error("Error canceling booking:", error);
    throw error;
  }
}

// Function to get all users booked for a specific event
export async function getBookedUsersForEvent(eventId) {
  try {
    const eventRef = doc(db, "events", eventId);
    const eventDoc = await getDoc(eventRef);

    if (eventDoc.exists()) {
      const eventData = eventDoc.data();
      const bookedUsers = eventData.bookedUsers || [];
      return bookedUsers;
    } else {
      console.log("Event does not exist.");
      return [];
    }
  } catch (error) {
    console.error("Error getting booked users for event:", error);
    throw error;
  }
}

// CMS functions for landing page content management

// Function to create landing page content
export async function createLandingPageContent(contentId, contentData) {
  try {
    const contentRef = doc(db, "landingPageContent", contentId);
    await setDoc(contentRef, contentData);
    console.log("Landing page content created successfully!");
  } catch (error) {
    console.error("Error creating landing page content:", error.message);
    throw error;
  }
}

// Function to retrieve the landing page content
export async function getLandingPageContent() {
  try {
    const contentCollection = collection(db, "landingPageContent");
    const snapshot = await getDocs(contentCollection);
    
    const content = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return content.length > 0 ? content[0] : null;
  } catch (error) {
    console.error("Error getting landing page content:", error);
    throw error;
  }
}

// Function to update the landing page content
export async function updateLandingPageContent(contentId, updatedData) {
  try {
    const contentRef = doc(db, "landingPageContent", contentId);
    await updateDoc(contentRef, updatedData);
    console.log("Landing page content updated successfully!");
  } catch (error) {
    if (error.code === 'not-found') {
      await createLandingPageContent(contentId, updatedData);
    } else {
      console.error("Error updating landing page content:", error);
      throw error;
    }
  }
}

// Function to delete the landing page content
export async function deleteLandingPageContent(contentId) {
  try {
    const contentRef = doc(db, "landingPageContent", contentId);
    await deleteDoc(contentRef);
    console.log("Landing page content deleted successfully!");
  } catch (error) {
    console.error("Error deleting landing page content:", error);
    throw error;
  }
}