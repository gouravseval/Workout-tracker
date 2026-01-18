import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
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
  type: "diet" | "workout",
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
