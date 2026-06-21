import { doc, getDoc } from "firebase/firestore";

import { db } from "./firebase";

export const getUserById = async (userId: string) => {
  const snapshot = await getDoc(doc(db, "users", userId));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};
