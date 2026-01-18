import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "./firebase";
import { format } from "date-fns";

// Helper to get current user ID
const getUserId = () => {
  const user = auth.currentUser;
  return user ? user.uid : null;
};

// --- Reminders ---

export const saveRemindersToDB = async (reminders: any[]) => {
  const uid = getUserId();
  if (!uid) return; // Silent return if not logged in (demo mode)

  try {
    await setDoc(doc(db, "users", uid), { reminders }, { merge: true });
    console.log("Reminders saved to cloud");
  } catch (e) {
    console.error("Error saving reminders:", e);
  }
};

export const getRemindersFromDB = async () => {
  const uid = getUserId();
  if (!uid) return null;

  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().reminders) {
      return docSnap.data().reminders;
    }
  } catch (e) {
    console.error("Error fetching reminders:", e);
  }
  return null;
};

// --- Daily Logs (Diet & Workout) ---

export const saveDailyLog = async (
  date: Date,
  type: "diet" | "workout" | "water",
  data: any,
) => {
  const uid = getUserId();
  if (!uid) return;

  const dateKey = format(date, "yyyy-MM-dd");

  try {
    // We store daily logs in a subcollection: users/{uid}/logs/{dateKey}
    const logRef = doc(db, "users", uid, "logs", dateKey);
    await setDoc(logRef, { [type]: data }, { merge: true });
    console.log(`Saved ${type} log for ${dateKey}`);
  } catch (e) {
    console.error(`Error saving ${type} log:`, e);
  }
};

export const getDailyLog = async (date: Date) => {
  const uid = getUserId();
  if (!uid) return null;

  const dateKey = format(date, "yyyy-MM-dd");

  try {
    const logRef = doc(db, "users", uid, "logs", dateKey);
    const docSnap = await getDoc(logRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (e) {
    console.error("Error fetching daily log:", e);
  }
  return null;
};

// --- Photos ---

export const uploadWeeklyPhoto = async (file: File, weekLabel: string) => {
  const uid = getUserId();
  if (!uid) return null;

  try {
    // Path: users/{uid}/photos/{weekLabel}
    const storageRef = ref(storage, `users/${uid}/photos/${weekLabel}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    // Save metadata to Firestore
    await setDoc(
      doc(db, "users", uid, "photos", weekLabel),
      {
        url: downloadURL,
        date: new Date().toISOString(),
      },
      { merge: true },
    );

    return downloadURL;
  } catch (e) {
    console.error("Error uploading photo:", e);
    return null;
  }
};

export const getWeeklyPhotos = async () => {
  // Note: Since we store photos as individual docs in a subcollection, this is a bit simpler
  // to just return a mock list or implementing a collection fetch if we needed all of them.
  // For this simple app, we might just fetch specific weeks or store them in a single array on the main user doc if we preferred.
  // Let's stick to the main user doc for simplicity of fetching all at once?
  // Actually, subcollection is cleaner. Let's implementing getting all photos.
  // ... wait, 'getDocs' is needed. I'll just save it to the main user doc for easier loading list.

  // REVISING STRATEGY: Save photo list to main user doc for easier single-fetch
  return null;
};

export const savePhotoEntry = async (photoEntry: any) => {
  const uid = getUserId();
  if (!uid) return;

  // We'll append to a "gallery" array in the main user doc
  // This requires arrayUnion but I removed it earlier.
  // Let's just read-modify-write the array for simplicity without complex imports
  try {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    let gallery = [];
    if (snap.exists() && snap.data().gallery) {
      gallery = snap.data().gallery;
    }
    gallery.push(photoEntry);
    await setDoc(userRef, { gallery }, { merge: true });
  } catch (e) {
    console.error(e);
  }
};

export const getGallery = async () => {
  const uid = getUserId();
  if (!uid) return [];
  try {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    if (snap.exists() && snap.data().gallery) {
      return snap.data().gallery;
    }
  } catch (e) {
    console.error(e);
  }
  return [];
};
