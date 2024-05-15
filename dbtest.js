// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyBMFCwNVGnhiq9ok1iXP_GDfYAAnVTFGNM",
//   authDomain: "firestore-90bab.firebaseapp.com",
//   projectId: "firestore-90bab",
//   storageBucket: "firestore-90bab.appspot.com",
//   messagingSenderId: "642515248476",
//   appId: "1:642515248476:web:26dfe4cb518311f82fcd99",
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // Function to write data to Firestore
// async function writeToFirestore() {
//   try {
//     // Write some test data to Firestore
//     const docRef = await addDoc(collection(db, "testData"), {
//       message: "Hello, Firestore!",
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (error) {
//     console.error("Error adding document: ", error);
//   }
// }

// // Call the function to write data to Firestore
// writeToFirestore();

// // Function to read data from Firestore
// async function readFromFirestore() {
//   try {
//     // Read the data from Firestore
//     const querySnapshot = await getDocs(collection(db, "testDatatwo"));
//     querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} => ${doc.data().message}`);
//     });
//   } catch (error) {
//     console.error("Error getting documents: ", error);
//   }
// }

// // Call the function to read data from Firestore
// readFromFirestore();

// function FirestoreTest() {
//   return (
//     <div>
//       <button onClick={writeToFirestore}>Write to Firestore</button>
//       <button onClick={readFromFirestore}>Read from Firestore</button>
//     </div>
//   );
// }

// export default FirestoreTest;
