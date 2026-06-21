import { doc, getDoc } from "firebase/firestore";

import { db } from "./firebase";

type UserData = {
  id: string;
  [key: string]: any;
};

export const getUserById = async (userId: string): Promise<UserData | null> => {
  const snapshot = await getDoc(doc(db, "users", userId));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};
