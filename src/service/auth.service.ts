import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "./firebase";

export const loginUser = async (name: string, gender: string) => {
  const q = query(
    collection(db, "users"),
    where("name", "==", name),
    where("gender", "==", gender),
  );

  console.log(name, gender)

  const snapshot = await getDocs(q);

  console.log(
    snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),
  );

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];

  return {
    id: doc.id,
    ...doc.data(),
  };
};
