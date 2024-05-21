import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase.config"; // Import Firestore database and Storage references
import { useClerk } from '@clerk/nextjs'; // Import Clerk hook for authentication

export async function createEvent(title, date, description, imageFile, category, location, numberOfSeats) {
  try {
    if (!imageFile) {
      throw new Error('Image file is required.');
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
      bookedUsers: [] // Initialize bookedUsers as an empty array
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
        ...docSnapshot.data()
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
export async function updateEvent(eventId, updatedData) {
  try {
    const eventRef = doc(db, "events", eventId);
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
export async function bookEventForUser(eventId) {
  try {
    const { user } = useClerk(); // Get the authenticated user from Clerk
    const eventRef = doc(db, "events", eventId);
    const eventDoc = await getDoc(eventRef);

    if (eventDoc.exists()) {
      const eventData = eventDoc.data();
      const numberOfSeats = eventData.numberOfSeats || 0; // Get the total number of seats
      const bookedUsers = eventData.bookedUsers || []; // Get the array of booked users

      // Check if all seats are already booked
      if (bookedUsers.length >= numberOfSeats) {
        console.log("This event is fully booked.");
        return; // Exit function
      }

      // Check if the user is already booked for the event
      if (bookedUsers.includes(user.id)) {
        console.log("User already booked for this event.");
        return; // Exit function
      }

      // Add the user to the 'bookedUsers' array
      bookedUsers.push(user.id);

      // Update the event document with the new 'bookedUsers' array
      await updateDoc(eventRef, {
        bookedUsers: bookedUsers
      });

      console.log("User successfully booked for the event.");
    } else {
      console.log("Event does not exist.");
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
      .filter((event) => event.bookedUsers && event.bookedUsers.includes(user.id));
    return bookedEvents;
  } catch (error) {
    console.error("Error getting booked events for user:", error);
    throw error;
  }
}

// Function to cancel booking for an event by a Clerk user
export async function cancelBookingForUser(eventId) {
  try {
    const { user } = useClerk(); // Get the authenticated user from Clerk
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
      const updatedBookedUsers = eventData.bookedUsers.filter((userId) => userId !== user.id);

      // Update the event document with the updated 'bookedUsers' array
      await updateDoc(eventRef, {
        bookedUsers: updatedBookedUsers
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

// Example usage
async function exampleUsage() {
  const eventId = "your-event-id"; // Replace with your actual event ID
  try {
    const bookedUsers = await getBookedUsersForEvent(eventId);
    console.log("Booked users:", bookedUsers);
  } catch (error) {
    console.error("Error:", error);
  }
}

exampleUsage();
